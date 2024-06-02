import { Directive, input, model } from "@angular/core";
import { ColorType } from "../../models/color";

@Directive()
export abstract class CustomInput {
    public checked = model(false);
    public disabled = model(false);
    public color = input<ColorType>();

    protected onChange(checked: boolean): void {
        this.checked.set(checked);
    }
}