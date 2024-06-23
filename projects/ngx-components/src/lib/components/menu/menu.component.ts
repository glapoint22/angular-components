import { Component, ElementRef, Renderer2, TemplateRef, ViewContainerRef, contentChildren, inject, input, viewChild } from '@angular/core';
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
export class MenuComponent {
  public color = input<ColorType>('primary');
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

  public ngOnInit(): void {
    this.dividers().forEach((divider) => {
      this.renderer.listen(divider.nativeElement, 'mouseenter', () => this.clearSelectedMenuItem());
    });

    this.menuItems().forEach((menuItem) => {
      menuItem.onMouseEnter.subscribe(() => this.onMenuItemMouseEnter(menuItem));
    });
  }

  private setDirty(value: boolean): void {
    this.isDirty = value;
  }

  private clearSelectedMenuItem(): void {
    const menuItem = this.selectedMenuItem;

    this.selectedMenuItem?.setSelected(false);
    this.selectedMenuItem?.submenu()?.setDirty(false);
    this.selectedMenuItem?.submenu()?.close();
    this.selectedMenuItem = null;

    menuItem?.submenu()?.clearSelectedMenuItem();
  }


  private onMenuItemMouseEnter(menuItem: MenuItemDirective): void {
    if (menuItem === this.selectedMenuItem) {
      menuItem.submenu()?.setDirty(false);
      return;
    }

    this.clearSelectedMenuItem();

    this.setDirty(true);
    this.selectedMenuItem = menuItem;
    this.selectedMenuItem.setSelected(true);
    this.selectedMenuItem.showSubmenu();
  }


  onMenuMouseLeave() {
    setTimeout(() => {
      if (!this.selectedMenuItem?.submenu()?.isDirty) {
        this.clearSelectedMenuItem();
      }
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

    this.createOverlay(positionStrategy);
  }

  public openAsSubmenu(element: HTMLElement): void {
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

    this.createOverlay(positionStrategy);
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

    this.createOverlay(positionStrategy);
  }


  public close(): void {
    this.overlayRef.detach();
  }


  private createOverlay(positionStrategy: FlexibleConnectedPositionStrategy): void {
    this.overlayRef = this.overlay.create({ positionStrategy, width: '100%', maxWidth: '280px' });

    const portal = new TemplatePortal(this.menuTemplate()!, this.viewContainerRef);
    this.overlayRef.attach(portal);
  }
}