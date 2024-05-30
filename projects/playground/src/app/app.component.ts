import { Component, Renderer2, inject } from '@angular/core';
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
  protected buttonLabel!: string;
  private renderer = inject(Renderer2);

  favoriteSeason: string = 'Summer';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];
  checked = false;

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
}