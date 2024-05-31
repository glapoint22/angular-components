import { Directive, ElementRef, OnInit, Renderer2, booleanAttribute, inject, input } from "@angular/core";
import { Color } from "../models/color";

@Directive()
export abstract class Button implements OnInit {
    public color = input<Color>();
    public disabled = input(false, { transform: booleanAttribute });
    private el: ElementRef<HTMLButtonElement> = inject(ElementRef);
    private renderer: Renderer2 = inject(Renderer2);

    public ngOnInit(): void {
        this.addClass('button');
    }


    protected addClass(className: string): void {
        this.renderer.addClass(this.el.nativeElement, className);
    }
}