import { Component, Renderer2, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent, RadioButtonComponent } from '../../../ngx-components/src/public-api';
import { RadioGroupComponent } from '../../../ngx-components/src/lib/components/radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../ngx-components/src/lib/components/checkbox/checkbox.component';
import { BasicButtonDirective } from '../../../ngx-components/src/lib/components/basic-button/basic-button.directive';
import { RaisedButtonDirective } from '../../../ngx-components/src/lib/components/raised-button/raised-button.directive';
import { StrokedButtonDirective } from '../../../ngx-components/src/lib/components/stroked-button/stroked-button.directive';
import { FlatButtonDirective } from '../../../ngx-components/src/lib/components/flat-button/flat-button.directive';
import { IconButtonDirective } from '../../../ngx-components/src/lib/components/icon-button/icon-button.directive';
import { DividerComponent } from '../../../ngx-components/src/lib/components/divider/divider.component';
import { FormFieldComponent } from '../../../ngx-components/src/lib/components/form-field/form-field.component';
import { InputFieldDirective } from '../../../ngx-components/src/lib/components/input-field/input-field.directive';
import { FormFieldLabelComponent } from '../../../ngx-components/src/lib/components/form-field-label/form-field-label.component';
import { FormFieldHintComponent } from '../../../ngx-components/src/lib/components/form-field-hint/form-field-hint.component';
import { SuffixDirective } from '../../../ngx-components/src/lib/components/suffix/suffix.directive';
import { PrefixDirective } from '../../../ngx-components/src/lib/components/prefix/prefix.directive';
import { CalendarComponent } from '../../../ngx-components/src/lib/components/date-picker/calendar/calendar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IconComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    FormsModule,
    CheckboxComponent,
    BasicButtonDirective,
    RaisedButtonDirective,
    StrokedButtonDirective,
    FlatButtonDirective,
    IconButtonDirective,
    DividerComponent,
    FormFieldComponent,
    InputFieldDirective,
    FormFieldLabelComponent,
    FormFieldHintComponent,
    SuffixDirective,
    PrefixDirective,
    CalendarComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected buttonLabel!: string;
  private renderer = inject(Renderer2);

  favoriteSeason: string = 'Summer';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  checked = true;
  calendar = viewChild(CalendarComponent);

  ngOnInit() {
    this.renderer.addClass(document.body, 'light-theme');
    this.buttonLabel = 'Dark Theme';
    
    this.calendar()?.setDate(new Date());
  }


  protected onClick(): void {
    if (this.buttonLabel === 'Dark Theme') {
      this.buttonLabel = 'Light Theme';
      this.renderer.addClass(document.body, 'dark-theme');
      this.renderer.removeClass(document.body, 'light-theme');
    } else {
      this.buttonLabel = 'Dark Theme';
      this.renderer.addClass(document.body, 'light-theme');
      this.renderer.removeClass(document.body, 'dark-theme');
    }
  }
}