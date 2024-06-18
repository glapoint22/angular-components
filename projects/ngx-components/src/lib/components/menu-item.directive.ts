import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[menuItem]',
  standalone: true
})
export class MenuItemDirective {
  private el: ElementRef<HTMLButtonElement> = inject(ElementRef<HTMLButtonElement>);
    private renderer: Renderer2 = inject(Renderer2);

    public ngOnInit(): void {
      this.renderer.addClass(this.el.nativeElement, 'menu-item');
    }
}