import { AfterContentInit, Component, ElementRef, OnDestroy, Renderer2, TemplateRef, ViewContainerRef, contentChildren, inject, input, viewChild } from '@angular/core';
import { Color, ColorType } from '../../models/color';
import { FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MenuItemDirective } from '../menu-item.directive';
import { DividerComponent } from '../divider/divider.component';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent implements AfterContentInit, OnDestroy {
  public color = input<ColorType>('primary');
  public isOpen: boolean = false;
  protected Color = Color;
  private overlay = inject(Overlay);
  private overlayRef!: OverlayRef;
  private viewContainerRef = inject(ViewContainerRef);
  private menuTemplate = viewChild<TemplateRef<any>>('menuTemplate');
  private menuItems = contentChildren(MenuItemDirective);
  private dividers = contentChildren(DividerComponent, { read: ElementRef<HTMLElement> });
  private selectedMenuItem!: MenuItemDirective | null;
  private isDirty!: boolean;
  private renderer: Renderer2 = inject(Renderer2);
  private removeDividersListener!: () => void;
  private removeMenuItemsListener!: () => void;
  private removeEscKeyListener!: () => void;
  private removeArrowsListener!: () => void;
  private removeEnterListener!: () => void;
  private parent!: MenuComponent | null;


  public ngAfterContentInit(): void {
    this.menuItems().forEach((menuItem) => {
      menuItem.submenu()?.setParent(this);
      menuItem.onClick.subscribe(() => {
        this.recursiveClose();
      });
    });
  }


  public open(element: HTMLElement): void {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom'
        }
      ]);

    this.setMenu(positionStrategy);
  }



  public openAt(x: number, y: number): void {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo({ x, y })
      .withPositions([
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);

    this.setMenu(positionStrategy);
  }


  private openSubmenu(menuItem: MenuItemDirective): void {
    const element = menuItem.element.nativeElement;
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(element)
      .withPositions([
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: -4
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: -4
        }
      ]);

    this.setMenu(positionStrategy);
  }


  private setMenu(positionStrategy: FlexibleConnectedPositionStrategy): void {
    this.isOpen = true;
    this.createOverlay(positionStrategy);
    this.createListeners();
  }


  public close(): void {
    this.overlayRef.detach();
    this.removeListeners();
    this.closeSubmenus();
    this.isOpen = false;
  }



  private recursiveClose(): void {
    this.close();
    this.parent?.recursiveClose();
  }




  private setParent(parent: MenuComponent): void {
    this.parent = parent;
  }





  private createOverlay(positionStrategy: FlexibleConnectedPositionStrategy): void {
    this.overlayRef = this.overlay.create({ positionStrategy, width: '100%', maxWidth: '280px' });

    const portal = new TemplatePortal(this.menuTemplate()!, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }



  private createListeners(): void {
    this.menuItems().forEach((menuItem) => {
      this.removeMenuItemsListener = this.renderer.listen(menuItem.element.nativeElement, 'mouseenter', () => this.onMenuItemMouseEnter(menuItem));
      this.removeEnterListener = this.renderer.listen(menuItem.element.nativeElement, 'keydown.enter', (event: KeyboardEvent) => {
        if (!menuItem.submenu() || menuItem.submenu()?.isOpen) return;

        this.selectFirstSubmenuItem(menuItem.submenu()!);
        event.preventDefault();
      });
    });

    this.dividers().forEach((divider) => {
      this.removeDividersListener = this.renderer.listen(divider.nativeElement, 'mouseenter', () => this.closeSubmenus());
    });

    this.removeEscKeyListener = this.renderer.listen(window, 'keydown.esc', () => {
      if (!this.isSubmenuOpen()) {
        this.close();
      }
    });

    this.removeArrowsListener = this.renderer.listen(window, 'keydown', (event: KeyboardEvent) => {
      if (this.isSubmenuOpen()) return;
      this.handleArrowKeys(event);
    });
  }


  private selectFirstSubmenuItem(submenu: MenuComponent): void {
    const submenuFirstItem = submenu.getNextMenuItem(-1, 1);

    submenu.openSubmenu(this.selectedMenuItem!);
    submenu.selectMenuItem(submenuFirstItem);
  }

  private removeListeners(): void {
    if (this.removeMenuItemsListener) this.removeMenuItemsListener();
    if (this.removeDividersListener) this.removeDividersListener();
    if (this.removeEscKeyListener) this.removeEscKeyListener();
    if (this.removeArrowsListener) this.removeArrowsListener();
    if (this.removeEnterListener) this.removeEnterListener();
  }


  private isSubmenuOpen(): boolean {
    return this.menuItems().some((menuItem) => menuItem.submenu()?.isOpen);
  }

  private handleArrowKeys(event: KeyboardEvent): void {
    if (!event.key.startsWith('Arrow')) return;

    let index = this.menuItems().findIndex((menuItem) => menuItem === this.selectedMenuItem);

    switch (event.key) {
      // Arrow Down
      case 'ArrowDown':
        const menuItemDown = this.getNextMenuItem(index, 1);
        this.selectMenuItem(menuItemDown);
        break;

      // Arrow Up
      case 'ArrowUp':
        if (index === -1) index = this.menuItems().length;
        const menuItemUp = this.getNextMenuItem(index, -1);
        this.selectMenuItem(menuItemUp);
        break;

      // Arrow Right
      case 'ArrowRight':
        if (this.selectedMenuItem?.submenu()) {
          this.selectFirstSubmenuItem(this.selectedMenuItem.submenu()!);
        }
        break;

      // Arrow Left
      case 'ArrowLeft':
        if (this.parent && this.parent.selectedMenuItem) {
          this.parent.selectMenuItem(this.parent.selectedMenuItem);
        }
        break;
    }

    event.preventDefault();
  }

  private getNextMenuItem(index: number, direction: number): MenuItemDirective {
    const itemCount = this.menuItems().length;
    let nextIndex = index;

    do {
      nextIndex = (nextIndex + direction + itemCount) % itemCount;
    } while (this.menuItems()[nextIndex].element.nativeElement.disabled);

    return this.menuItems()[nextIndex];
  }


  private setDirty(value: boolean): void {
    this.isDirty = value;
  }

  private closeSubmenus(): void {
    this.selectedMenuItem?.setSelected(false);
    this.selectedMenuItem?.submenu()?.setDirty(false);
    if (this.selectedMenuItem?.submenu()?.isOpen) {
      this.selectedMenuItem?.submenu()?.close();
    }

    this.selectedMenuItem = null;
  }


  private onMenuItemMouseEnter(menuItem: MenuItemDirective): void {
    if (menuItem === this.selectedMenuItem) {
      menuItem.submenu()?.setDirty(false);
      return;
    }

    this.selectMenuItem(menuItem);

    if (!menuItem.element.nativeElement.disabled)
      menuItem.submenu()?.openSubmenu(menuItem);
  }


  private selectMenuItem(menuItem: MenuItemDirective): void {
    this.closeSubmenus();
    this.setDirty(true);
    menuItem.setSelected(true);
    this.selectedMenuItem = menuItem;
  }


  protected onMenuMouseLeave(): void {
    setTimeout(() => {
      if (!this.selectedMenuItem?.submenu()?.isDirty) {
        this.closeSubmenus();
      }
    });
  }


  public ngOnDestroy(): void {
    this.overlayRef.dispose();
  }
}