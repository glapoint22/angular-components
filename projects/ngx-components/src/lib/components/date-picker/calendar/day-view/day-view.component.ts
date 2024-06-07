import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'day-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './day-view.component.html',
  styleUrls: ['../calendar-grid.scss', './day-view.component.scss']
})
export class DayViewComponent {
  protected calendarDays: any = [];
  protected selectedDate: Date = new Date();

  ngOnInit() {
    const currentDate = new Date();
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 (Sun) - 6 (Sat)

    const daysInCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const daysInPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();

    const daysFromPrevMonth = firstDayOfWeek;
    const totalDays = 6 * 7; // 6 rows and 7 columns
    const daysFromNextMonth = totalDays - (daysFromPrevMonth + daysInCurrentMonth);

    // Days from the previous month
    for (let i = daysFromPrevMonth; i > 0; i--) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, daysInPreviousMonth - i + 1);

      this.calendarDays.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth: false,
        isCurrentDay: this.isCurrentDay(date),
        isSelectedDate: this.isSelectedDate(date)
      });
    }

    // Days from the current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);

      this.calendarDays.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth: true,
        isCurrentDay: this.isCurrentDay(date),
        isSelectedDate: this.isSelectedDate(date)
      });
    }

    // Days from the next month
    for (let i = 1; i <= daysFromNextMonth; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, i);

      this.calendarDays.push({
        date: date,
        day: date.getDate(),
        isCurrentMonth: false,
        isCurrentDay: this.isCurrentDay(date),
        isSelectedDate: this.isSelectedDate(date)
      });
    }
  }

  private isCurrentDay(date: Date): boolean {
    const todaysDate = new Date();

    return date.getDate() === todaysDate.getDate() &&
      date.getMonth() === todaysDate.getMonth() &&
      date.getFullYear() === todaysDate.getFullYear();
  }


  private isSelectedDate(date: Date): boolean {
    return date.getDate() === this.selectedDate.getDate() &&
      date.getMonth() === this.selectedDate.getMonth() &&
      date.getFullYear() === this.selectedDate.getFullYear();
  }


  protected onCalendarDayClick(date: Date): void {
    this.selectedDate = date;
  }
}
