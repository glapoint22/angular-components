import { Component } from '@angular/core';
import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  public onHostClick(): void {
    console.log('DropdownComponent.onHostClick');
  }

}