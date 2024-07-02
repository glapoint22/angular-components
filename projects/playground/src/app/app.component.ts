import { Component, Renderer2, inject } from '@angular/core';
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
import { DatePickerDirective } from '../../../ngx-components/src/lib/components/date-picker/directive/date-picker.directive';
import { DialogService } from '../../../ngx-components/src/lib/components/dialog.service';
import { DropdownComponent } from '../../../ngx-components/src/lib/components/dropdown/dropdown.component';
import { DropdownItemComponent } from '../../../ngx-components/src/lib/components/dropdown-item/dropdown-item.component';
import { MenuComponent } from '../../../ngx-components/src/lib/components/menu/menu.component';
import { MenuItemDirective } from '../../../ngx-components/src/lib/components/menu-item.directive';
import { MenuBarComponent } from '../../../ngx-components/src/lib/components/menu-bar/menu-bar.component';
import { MenuBarItemDirective } from '../../../ngx-components/src/lib/components/menu-bar-item.directive';

interface Food {
  value: string;
  viewValue: string;
}

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
    DatePickerDirective,
    DropdownComponent,
    DropdownItemComponent,
    MenuComponent,
    MenuItemDirective,
    MenuBarComponent,
    MenuBarItemDirective
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  protected buttonLabel!: string;
  private renderer = inject(Renderer2);
  private dialog = inject(DialogService);
  

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  selectedValue!: string ;

  favoriteSeason: string = 'Summer';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  checked = true;
  myDate: Date = new Date('6/22/24');
  states: string[] = [
    'Alabama',
    'Alaska',
    'Arizona',
    'Arkansas',
    'California',
    'Colorado',
    'Connecticut',
    'Delaware',
    'Florida',
    'Georgia',
    'Hawaii',
    'Idaho',
    'Illinois',
    'Indiana',
    'Iowa',
    'Kansas',
    'Kentucky',
    'Louisiana',
    'Maine',
    'Maryland',
    'Massachusetts',
    'Michigan',
    'Minnesota',
    'Mississippi',
    'Missouri',
    'Montana',
    'Nebraska',
    'Nevada',
    'New Hampshire',
    'New Jersey',
    'New Mexico',
    'New York',
    'North Carolina',
    'North Dakota',
    'Ohio',
    'Oklahoma',
    'Oregon',
    'Pennsylvania',
    'Rhode Island',
    'South Carolina',
    'South Dakota',
    'Tennessee',
    'Texas',
    'Utah',
    'Vermont',
    'Virginia',
    'Washington',
    'West Virginia',
    'Wisconsin',
    'Wyoming',
  ];

  ngOnInit() {
    this.renderer.addClass(document.body, 'light-theme');
    this.buttonLabel = 'Dark Theme';
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

  protected openDialog(): void {
    this.dialog.open({
      color: 'primary',
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item?',
      action: () => console.log('Dialog Action'),
      actionName: 'Delete',
      cancelName: 'Cancel',
      defaultFocus: 'cancel',
      icon: {
        name: 'warning',
        color: 'warn',
        size: 60,
        fill: true
      }
    });
  }
}