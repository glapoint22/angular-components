import { Directive, ElementRef, Renderer2, inject, input, output } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Directive({
  selector: '[menuItem]',
  standalone: true
})
export class MenuItemDirective {
  public submenu = input<MenuComponent>();
  public onMouseEnter = output<void>();
  private el: ElementRef<HTMLButtonElement> = inject(ElementRef<HTMLButtonElement>);
  private renderer: Renderer2 = inject(Renderer2);


  public ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'menu-item');
    this.renderer.listen(this.el.nativeElement, 'mouseenter', () => this.onMouseEnter.emit());

    if (this.submenu()) {
      this.createArrowIcon();
    }
    
    // Access the native element
    const nativeElement = this.el.nativeElement;

    // Create the content div element
    const contentDiv = this.renderer.createElement('div');

    // Move all child nodes into the content div
    while (nativeElement.firstChild) {
      this.renderer.appendChild(contentDiv, nativeElement.firstChild);
    }

    // Append the content div to the original element
    this.renderer.appendChild(nativeElement, contentDiv);
  }


  public showSubmenu() {
    this.submenu()?.openAsSubmenu(this.el.nativeElement);
  }




  public setSelected(selected: boolean): void {
    if (selected) {
      this.renderer.addClass(this.el.nativeElement, 'selected-menu-item');
    } else {
      this.renderer.removeClass(this.el.nativeElement, 'selected-menu-item');
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
    this.renderer.appendChild(this.el.nativeElement, svg);
  }
}