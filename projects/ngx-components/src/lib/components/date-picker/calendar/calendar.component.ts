import { Component } from '@angular/core';
import { DayViewComponent } from './day-view/day-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { IconComponent } from '../../icon/icon.component';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [DayViewComponent, MonthViewComponent, YearViewComponent, IconComponent],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {

}
