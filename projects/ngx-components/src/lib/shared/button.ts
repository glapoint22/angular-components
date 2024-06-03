import { Directive, ElementRef, OnInit, Renderer2, inject, input } from "@angular/core";
import { Color, ColorType } from "../models/color";

@Directive()
export abstract class Button implements OnInit {
    public color = input<ColorType>('primary');
    private el: ElementRef<HTMLButtonElement> = inject(ElementRef<HTMLButtonElement>);
    private renderer: Renderer2 = inject(Renderer2);

    public ngOnInit(): void {
        this.addClass('button');
        this.addClass(Color.getColorClass(this.color(), 'button'));
    }


    protected addClass(className: string): void {
        this.renderer.addClass(this.el.nativeElement, className);
    }
}