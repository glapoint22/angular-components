import { Directive, ElementRef, Renderer2, inject, input } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

@Directive({
  selector: '[menuBarItem]',
  standalone: true
})
export class MenuBarItemDirective {
  public menuBarItem = input<MenuComponent>();
  private el: ElementRef<HTMLButtonElement> = inject(ElementRef<HTMLButtonElement>);
  private renderer: Renderer2 = inject(Renderer2);


  public ngOnInit(): void {
    this.renderer.addClass(this.el.nativeElement, 'menu-bar-item');
  }
}
