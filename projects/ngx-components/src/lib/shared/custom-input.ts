import { booleanAttribute, Directive, input } from "@angular/core";
import { ColorType } from "../models/color";

@Directive()
export abstract class CustomInput {
    public color = input<ColorType>();
    public disabled = input(false, { transform: booleanAttribute });
    public checked!: boolean;
    protected hasFocus!: boolean;
}