import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, contentChild, input, viewChild } from '@angular/core';
import { Color, ColorType } from '../../models/color';
import { InputFieldDirective } from '../input-field/input-field.directive';
import { FormFieldLabelComponent } from '../form-field-label/form-field-label.component';
import { FormFieldHintComponent } from '../form-field-hint/form-field-hint.component';
import { SuffixDirective } from '../suffix/suffix.directive';
import { PrefixDirective } from '../prefix/prefix.directive';
import { DropdownComponent } from '../dropdown/dropdown.component';

@Component({
  selector: 'form-field',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './form-field.component.html',
  styleUrl: './form-field.component.scss'
})
export class FormFieldComponent implements OnInit {
  public color = input<ColorType>('primary');
  protected inputField = contentChild(InputFieldDirective);
  protected formFieldLabel = contentChild(FormFieldLabelComponent);
  protected formFieldHint = contentChild(FormFieldHintComponent);
  protected prefix = contentChild(PrefixDirective);
  protected suffix = contentChild(SuffixDirective);
  protected dropdown = contentChild(DropdownComponent);
  protected Color = Color;
  protected selected!: boolean;
  private formField = viewChild<ElementRef<HTMLElement>>('formField');

  public ngOnInit(): void {
    this.inputField()?.onBlur.subscribe(() => this.selected = false);
    this.inputField()?.onFocus.subscribe(() => this.selected = true);
    this.dropdown()?.onDropdownListMousedown.subscribe(() => this.selected = true);
    this.dropdown()?.onDropdownItemClick.subscribe(() => {
      this.selected = false;
      this.formField()?.nativeElement.focus();
    });
  }


  protected onFocus(): void {
    this.inputField()?.setFocus();
    this.dropdown()?.onFocus();
  }

  protected onBlur(): void {
    this.dropdown()?.onBlur();
  }

  protected onClick(): void {
    this.dropdown()?.toggleList();
  }
}