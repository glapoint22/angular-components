import { CommonModule } from '@angular/common';
import { Component, OnInit, contentChild, input } from '@angular/core';
import { Color, ColorType } from '../../models/color';
import { InputFieldDirective } from '../input-field/input-field.directive';

@Component({
  selector: 'form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements OnInit{
  public color = input<ColorType>('primary');
  private inputField = contentChild(InputFieldDirective);
  protected hasFocus!: boolean;
  protected Color = Color;

  public ngOnInit(): void {
    this.inputField()?.onBlur.subscribe(() => this.hasFocus = false);
    this.inputField()?.onFocus.subscribe(() => this.hasFocus = true);
  }
  

  protected onClick(): void {
    this.inputField()?.setFocus();
    this.hasFocus = true;
  }
}