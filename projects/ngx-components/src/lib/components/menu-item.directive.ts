import { Directive, ElementRef, HostListener, Renderer2, inject, input, output } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Directive({
  selector: '[menuItem]',
  standalone: true
})
export class MenuItemDirective {
  public submenu = input<MenuComponent>();
  public onClick = output<void>();
  public element: ElementRef<HTMLButtonElement> = inject(ElementRef<HTMLButtonElement>);
  private renderer: Renderer2 = inject(Renderer2);


  public ngOnInit(): void {
    this.renderer.addClass(this.element.nativeElement, 'menu-item');

    if (this.submenu()) {
      this.createArrowIcon();
    }

    this.setContent();
  }

  private setContent(): void {
    // Access the native element
    const nativeElement = this.element.nativeElement;

    // Create the content div element
    const contentDiv = this.renderer.createElement('div');

    // Move all child nodes into the content div
    while (nativeElement.firstChild) {
      this.renderer.appendChild(contentDiv, nativeElement.firstChild);
    }

    // Append the content div to the original element
    this.renderer.appendChild(nativeElement, contentDiv);
  }

  public setSelected(selected: boolean): void {
    if (selected) {
      this.renderer.addClass(this.element.nativeElement, 'selected-menu-item');
    } else {
      this.renderer.removeClass(this.element.nativeElement, 'selected-menu-item');
    }

    this.element.nativeElement.focus();
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
    this.renderer.appendChild(this.element.nativeElement, svg);
  }

  @HostListener('click')
  private onClickHandler(): void {
    if (!this.submenu()) this.onClick.emit();
  }
}