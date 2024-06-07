import { Component } from '@angular/core';
import { IconButtonDirective } from '../../../icon-button/icon-button.directive';
import { IconComponent } from '../../../icon/icon.component';


@Component({
  selector: 'year-view',
  standalone: true,
  imports: [IconButtonDirective, IconComponent],
  templateUrl: './year-view.component.html',
  styleUrls: ['../calendar-grid.scss', './year-view.component.scss']
})
export class YearViewComponent {

}
