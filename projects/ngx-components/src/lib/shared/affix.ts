import { Directive, ElementRef, OnInit, Renderer2, inject } from "@angular/core";

@Directive()
export class Affix implements OnInit {
    private el: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
    private renderer: Renderer2 = inject(Renderer2);

    public ngOnInit(): void {
        this.renderer.addClass(this.el.nativeElement, 'affix');
    }
}