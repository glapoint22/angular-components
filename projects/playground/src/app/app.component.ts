import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IconComponent, RadioButtonComponent } from '../../../ngx-components/src/public-api';
import { RadioGroupComponent } from '../../../ngx-components/src/lib/components/radio-group/radio-group.component';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '../../../ngx-components/src/lib/components/checkbox/checkbox.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    IconComponent,
    RadioButtonComponent,
    RadioGroupComponent,
    FormsModule,
    CheckboxComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  favoriteSeason: string = 'Summer';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  checked = false;
}