import { Component, inject, input } from '@angular/core';
import { CustomInput } from '../../shared/custom-input';
import { CommonModule } from '@angular/common';
import { RadioGroupComponent } from '../radio-group/radio-group.component';
import { Color } from '../../models/color';

@Component({
  selector: 'radio-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss'
})
export class RadioButtonComponent extends CustomInput {
  protected radioGroup: RadioGroupComponent = inject(RadioGroupComponent);
  public value = input<any>();
  protected Color = Color;
}