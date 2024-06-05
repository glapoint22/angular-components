import { CommonModule } from '@angular/common';
import { Component, OnInit, contentChild, input } from '@angular/core';
import { Color, ColorType } from '../../models/color';
import { InputFieldDirective } from '../input-field/input-field.directive';
import { FormFieldLabelComponent } from '../form-field-label/form-field-label.component';
import { FormFieldHintComponent } from '../form-field-hint/form-field-hint.component';
import { SuffixDirective } from '../suffix/suffix.directive';
import { PrefixDirective } from '../prefix/prefix.directive';

@Component({
  selector: 'form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements OnInit {
  public color = input<ColorType>('primary');
  private inputField = contentChild(InputFieldDirective);
  protected formFieldLabel = contentChild(FormFieldLabelComponent);
  protected formFieldHint = contentChild(FormFieldHintComponent);
  protected prefix = contentChild(PrefixDirective);
  protected suffix = contentChild(SuffixDirective);
  protected hasFocus!: boolean;
  protected Color = Color;

  public ngOnInit(): void {
    if (!this.inputField()) throw new Error('No input field provided');

    this.inputField()?.onBlur.subscribe(() => this.hasFocus = false);
    this.inputField()?.onFocus.subscribe(() => this.hasFocus = true);
  }


  protected onClick(): void {
    this.inputField()?.setFocus();
    this.hasFocus = true;
  }
}