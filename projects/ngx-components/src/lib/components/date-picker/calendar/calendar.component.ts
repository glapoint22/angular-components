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
  protected selectedMonth!: number;
  protected selectedYear!: number;
  protected currentCalendarView = CalendarView.Day;
  protected calendarView = CalendarView;

  public setDate(date: Date): void {
    this.date.set(date);
    this.selectedDate.set(date);
    this.selectedMonth = date.getMonth();
    this.selectedYear = date.getFullYear();
  }


  protected updateMonth(month: number): void {
    const JANUARY = 0;
    const DECEMBER = 11;

    this.selectedMonth = this.selectedMonth + month;

    if (this.selectedMonth < JANUARY) {
      this.selectedMonth = DECEMBER;
      this.updateYear(-1);
    } else if (this.selectedMonth > DECEMBER) {
      this.selectedMonth = JANUARY;
      this.updateYear(1);
    }

    this.date.update(date => new Date(date.getFullYear(), this.selectedMonth, date.getDate()));
    this.changeView(CalendarView.Day);
  }

  protected updateYear(year: number): void {
    this.selectedYear = this.selectedYear + year;
    this.date.update(date => new Date(this.selectedYear, date.getMonth(), date.getDate()));
    this.changeView(CalendarView.Day);
  }

  protected updateDateToToday(): void {
    this.setDate(new Date());
    this.changeView(CalendarView.Day);
  }

  protected changeView(view: CalendarView): void {
    this.currentCalendarView = view;
  }

  protected onDateSelect(date: Date): void {
    this.setDate(date);
  }

  protected onMonthSelect(month: number): void {
    this.selectedMonth = month;
    this.date.update(date => new Date(date.getFullYear(), this.selectedMonth, date.getDate()));
    this.changeView(CalendarView.Day);
  }

  protected onYearSelect(year: number): void {
    this.selectedYear = year;
    this.date.update(date => new Date(this.selectedYear, date.getMonth(), date.getDate()));
    this.changeView(CalendarView.Day);
  }

  protected getMonthName(month: number): string {
    const date = new Date(this.selectedYear, month, 1);
    return new DatePipe('en-US').transform(date, 'MMM')!;
  }
}