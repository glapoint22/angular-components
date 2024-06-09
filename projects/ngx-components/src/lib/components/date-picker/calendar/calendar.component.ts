import { Component, signal } from '@angular/core';
import { DayViewComponent } from './day-view/day-view.component';
import { MonthViewComponent } from './month-view/month-view.component';
import { YearViewComponent } from './year-view/year-view.component';
import { IconComponent } from '../../icon/icon.component';
import { DatePipe } from '@angular/common';
import { CalendarView } from './calendar-view';

@Component({
  selector: 'calendar',
  standalone: true,
  imports: [DayViewComponent, MonthViewComponent, YearViewComponent, IconComponent, DatePipe],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
  protected date = signal<Date>(new Date());
  protected selectedDate = signal<Date>(new Date());
  protected currentCalendarView = signal<CalendarView>(CalendarView.Day);
  protected CalendarView = CalendarView;

  public initializeDate(date: Date): void {
    this.setDate(date);
    this.setSelectedDate(date);
  }

  protected setDate(date: Date): void {
    this.date.set(date);
  }

  protected setSelectedDate(date: Date): void {
    this.selectedDate.set(date);
  }

  protected updateMonth(num: number): void {
    const date = new Date(this.date().getFullYear(), this.date().getMonth() + num, 1);
    this.setDate(date);
    this.changeView(CalendarView.Day);
  }

  protected updateYear(num: number): void {
    const date = new Date(this.date().getFullYear() + num, this.date().getMonth(), 1);
    this.setDate(date);
    this.changeView(CalendarView.Day);
  }

  protected updateDateToToday(): void {
    this.setDate(new Date());
    this.setSelectedDate(this.date());
    this.changeView(CalendarView.Day);
  }

  protected changeView(view: CalendarView): void {
    this.currentCalendarView.set(view);
  }

  protected onDateSelect(date: Date): void {
    this.setSelectedDate(date);
  }
}