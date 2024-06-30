import { AfterContentInit, Component, ElementRef, OnDestroy, Renderer2, TemplateRef, ViewContainerRef, contentChildren, inject, input, viewChild } from '@angular/core';
import { Color, ColorType } from '../../models/color';
import { ConnectedPosition, FlexibleConnectedPositionStrategy, FlexibleConnectedPositionStrategyOrigin, Overlay, OverlayRef } from '@angular/cdk/overlay';
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
  private menuElement = viewChild<ElementRef<HTMLElement>>('menu');
  private menuItems = contentChildren(MenuItemDirective);
  private dividers = contentChildren(DividerComponent, { read: ElementRef<HTMLElement> });
  private selectedMenuItem!: MenuItemDirective | undefined;
  private isDirty!: boolean;
  private renderer: Renderer2 = inject(Renderer2);
  private removeMouseEnterDividerListener!: () => void;
  private removeMenuItemsListener!: () => void;
  private removeEscKeyListener!: () => void;
  private removeArrowsListener!: () => void;
  private removeEnterListener!: () => void;
  private removeMouseDownListener!: () => void;
  private removeMouseDownDividerListener!: () => void;
  private parent!: MenuComponent | null;
  private timeoutId!: any;


  public ngAfterContentInit(): void {
    this.menuItems().forEach((menuItem: MenuItemDirective) => {
      menuItem.submenu()?.setParent(this);
      menuItem.onClick.subscribe(() => {
        this.getParentMenu().close();
      });
    });
  }




  public open(element: HTMLElement): void {
    const positions: ConnectedPosition[] = [
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
    ];

    this.openMenu(element, positions);
  }



  public openAt(x: number, y: number): void {
    const positions: ConnectedPosition[] = [
      {
        originX: 'start',
        originY: 'top',
        overlayX: 'start',
        overlayY: 'top'
      }
    ];

    this.openMenu({ x, y }, positions);
  }


  private openSubmenu(menuItem: MenuItemDirective): void {
    const positions: ConnectedPosition[] = [
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
    ]

    this.openMenu(menuItem.element.nativeElement, positions);
  }


  private openMenu(origin: FlexibleConnectedPositionStrategyOrigin, positions: ConnectedPosition[]): void {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(positions);

    this.isOpen = true;
    this.createOverlay(positionStrategy);
    this.createListeners();
  }




  public close(): void {
    this.overlayRef?.detach();
    this.removeListeners();
    this.isOpen = false;
    this.setDirty(false);
    this.selectedMenuItem?.setSelected(false);
    this.menuItems().forEach((menuItem) => {
      clearInterval(menuItem.submenu()?.timeoutId);
      if (menuItem.submenu()?.isOpen) menuItem.submenu()?.close();
    });
    this.selectedMenuItem = undefined;
  }




  private getParentMenu(): MenuComponent {
    return this.parent ? this.parent.getParentMenu() : this;
  }



  private setParent(parent: MenuComponent): void {
    this.parent = parent;
  }





  private createOverlay(positionStrategy: FlexibleConnectedPositionStrategy): void {
    this.overlayRef = this.overlay.create({ positionStrategy });

    const portal = new TemplatePortal(this.menuTemplate()!, this.viewContainerRef);
    this.overlayRef.attach(portal);
    setTimeout(() => {
      this.renderer.setStyle(this.menuElement()?.nativeElement, 'pointer-events', 'all');
    });
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
      this.removeMouseEnterDividerListener = this.renderer.listen(divider.nativeElement, 'mouseenter', () => {
        const submenu = this.selectedMenuItem?.submenu();

        this.delaySubmenuAction(submenu, () => submenu?.close());
        this.selectedMenuItem?.setSelected(false);
      });

      this.removeMouseDownDividerListener = this.renderer.listen(divider.nativeElement, 'mousedown', (event: MouseEvent) => event.stopPropagation());
    });

    this.removeEscKeyListener = this.renderer.listen(window, 'keydown.esc', () => {
      if (!this.isSubmenuOpen()) {
        this.selectedMenuItem?.setSelected(false);
        this.close();
      }
    });

    this.removeArrowsListener = this.renderer.listen(window, 'keydown', (event: KeyboardEvent) => {
      if (this.isSubmenuOpen()) return;
      this.handleArrowKeys(event);
    });

    if (!this.parent) {
      this.removeMouseDownListener = this.renderer.listen(window, 'mousedown', () => this.close());
    }
  }


  private selectFirstSubmenuItem(submenu: MenuComponent): void {
    const submenuFirstItem = submenu.getNextMenuItem(-1, 1);

    submenu.openSubmenu(this.selectedMenuItem!);

    if (submenuFirstItem)
      submenu.selectMenuItem(submenuFirstItem);
  }

  private removeListeners(): void {
    if (this.removeMenuItemsListener) this.removeMenuItemsListener();
    if (this.removeMouseEnterDividerListener) this.removeMouseEnterDividerListener();
    if (this.removeEscKeyListener) this.removeEscKeyListener();
    if (this.removeArrowsListener) this.removeArrowsListener();
    if (this.removeEnterListener) this.removeEnterListener();
    if (this.removeMouseDownListener) this.removeMouseDownListener();
    if (this.removeMouseDownDividerListener) this.removeMouseDownDividerListener();
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
        if (menuItemDown)
          this.selectMenuItem(menuItemDown);
        break;

      // Arrow Up
      case 'ArrowUp':
        if (index === -1) index = this.menuItems().length;
        const menuItemUp = this.getNextMenuItem(index, -1);
        if (menuItemUp)
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
          this.parent.selectedMenuItem.submenu()?.close();
          this.parent.selectMenuItem(this.parent.selectedMenuItem);
        }
        break;
    }

    event.preventDefault();
  }

  private getNextMenuItem(currentIndex: number, direction: number): MenuItemDirective | null {
    const itemCount = this.menuItems().length;
    let nextIndex = currentIndex;
    let isFound = false;

    for (let i = 0; i < itemCount; i++) {
      nextIndex = (nextIndex + direction + itemCount) % itemCount;
      if (!this.menuItems()[nextIndex].element.nativeElement.disabled) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      return null;
    }

    return this.menuItems()[nextIndex];
  }


  private setDirty(value: boolean): void {
    this.isDirty = value;
  }

  private onMenuItemMouseEnter(menuItem: MenuItemDirective): void {
    const submenu = this.selectedMenuItem?.submenu();

    this.delaySubmenuAction(submenu, () => submenu?.close());
    menuItem.submenu()?.setDirty(false);

    this.selectMenuItem(menuItem);
    this.setDirty(true);


    this.delaySubmenuAction(menuItem.submenu(), () => {
      if (menuItem.submenu()?.isOpen || menuItem.element.nativeElement.disabled) return;
      menuItem.submenu()?.openSubmenu(menuItem);
    });
  }

  private delaySubmenuAction(submenu: MenuComponent | undefined, callback: () => void): void {
    if (!submenu) return;
    const submenuDelay: number = 600;

    clearTimeout(submenu.timeoutId);

    submenu.timeoutId = setTimeout(() => {
      callback();
    }, submenuDelay);
  }


  private selectMenuItem(menuItem: MenuItemDirective): void {
    this.selectedMenuItem?.setSelected(false);
    menuItem.setSelected(true);
    this.selectedMenuItem = menuItem;
  }


  protected onMenuMouseLeave(): void {
    setTimeout(() => {
      if (!this.selectedMenuItem?.submenu()?.isDirty) {
        const submenu = this.selectedMenuItem?.submenu();

        this.delaySubmenuAction(submenu, () => submenu?.close());
        this.selectedMenuItem?.setSelected(false);
      }
    });
  }


  public ngOnDestroy(): void {
    this.overlayRef.dispose();
  }
}