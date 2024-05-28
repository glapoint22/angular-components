import { Component, forwardRef, inject, input } from '@angular/core';
import { CustomInput } from '../../shared/custom-input/custom-input';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
  }]
})
export class RadioButtonComponent extends CustomInput {
  protected radioGroup: RadioGroupComponent = inject(RadioGroupComponent);
  public value = input<any>();

  protected override onChange(checked: boolean) {
    super.onChange(checked);

    this.radioGroup.onChange(this.value());
  }
}