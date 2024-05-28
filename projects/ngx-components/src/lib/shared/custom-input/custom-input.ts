import { Directive, input, model } from "@angular/core";
import { Color } from "../../models/color";

@Directive()
export abstract class CustomInput {
    public checked = model(false);
    public disabled = model(false);
    public color = input<Color>();

    protected onChange(checked: boolean): void {
        this.checked.set(checked);
    }
}