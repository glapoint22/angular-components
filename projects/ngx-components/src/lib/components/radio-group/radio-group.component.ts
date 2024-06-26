import { CommonModule } from '@angular/common';
import { Component, contentChildren, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ColorType } from '../../models/color';
import { RadioButtonComponent } from '../radio-button/radio-button.component';

@Component({
  selector: 'radio-group',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-group.component.html',
  styleUrl: './radio-group.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroupComponent),
    multi: true
  }]
})
export class RadioGroupComponent implements ControlValueAccessor {
  public layout = input<'horizontal' | 'vertical'>('vertical');
  public color = input<ColorType>();
  public disabled: boolean = false;
  public name: string = this.generateName();
  public value: any;
  private radioButtons = contentChildren(RadioButtonComponent);
  public onChanges!: (value: any) => void;


  public writeValue(value: any): void {
    const radioButton = this.radioButtons().find(x => x.value() === value);

    this.value = value;
    radioButton?.checked.set(true);
  }

  public registerOnChange(fn: any): void {
    this.onChanges = fn;
  }

  public registerOnTouched(fn: any): void { }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  private generateName(): string {
    return Math.random().toString(36).substring(2);
  }
}