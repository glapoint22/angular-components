import { Directive, ElementRef, Renderer2, inject, input } from '@angular/core';
import { MenuComponent } from './menu/menu.component';
import { MenuItemDirective } from './menu-item.directive';

@Directive({
  selector: '[menuTrigger]',
  standalone: true
})
export class MenuTriggerDirective {
  public menu = input.required<MenuComponent>({alias: 'menuTrigger'});
  private renderer = inject(Renderer2);
  private ele = inject(ElementRef<HTMLElement>);
  private menuItem = inject(MenuItemDirective, { optional: true });
  private isMenuOpen: boolean = false;

  public ngOnInit(): void {
    if (this.menuItem) {
      this.createArrowIcon();
      this.renderer.listen(this.ele.nativeElement, 'mouseenter', () => {
        this.menu().open(this.ele.nativeElement);
      });
    } else {
      this.renderer.listen(this.ele.nativeElement, 'click', () => {
        this.toggleMenu();
      });
    }
  }

  private createArrowIcon(): void {
    const svgNS = 'http://www.w3.org/2000/svg';

    // Create the SVG element
    const svg = this.renderer.createElement('svg', svgNS);
    this.renderer.addClass(svg, 'submenu-icon');
    this.renderer.setAttribute(svg, 'viewBox', '0 0 5 10');
    this.renderer.setAttribute(svg, 'focusable', 'false');

    // create the polygon element
    const polygon = this.renderer.createElement('polygon', svgNS);
    this.renderer.setAttribute(polygon, 'points', '0,0 5,5 0,10');
    this.renderer.appendChild(svg, polygon);

    // append the svg element to the host element
    this.renderer.appendChild(this.ele.nativeElement, svg);
  }

  private toggleMenu(): void {
    if (this.isMenuOpen) {
      // Close the menu
      this.isMenuOpen = false;
      this.menu().close();

    } else {
      // Open the menu
      this.isMenuOpen = true;
      this.menu().open(this.ele.nativeElement);
    }
  }
}