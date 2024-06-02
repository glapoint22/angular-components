import { Component, forwardRef } from '@angular/core';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Color } from '../../models/color';

@Component({
  selector: 'checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true
  }]
})
export class CheckboxComponent extends CustomInput implements ControlValueAccessor {
  protected Color = Color;

  writeValue(value: any): void {
    this.checked.set(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void { }


  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}