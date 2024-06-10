import { Component, OnInit, OutputEmitterRef, input, output } from '@angular/core';
import { IconButtonDirective } from '../../../icon-button/icon-button.directive';
import { IconComponent } from '../../../icon/icon.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'year-view',
  standalone: true,
  imports: [IconButtonDirective, IconComponent, CommonModule],
  templateUrl: './year-view.component.html',
  styleUrls: ['../calendar-grid.scss', './year-view.component.scss']
})
export class YearViewComponent implements OnInit{
  public selectedYear = input.required<number>();
  public onYearSelect: OutputEmitterRef<number> = output<number>();
  protected years: Array<number> = [];
  private startYear: number = 0;

  public ngOnInit(): void {
    this.calculateStartYear();
    this.generateYears();
  }

  private calculateStartYear(): void {
    // Ensure the start year is a multiple of 16
    this.startYear = Math.floor(this.selectedYear() / 16) * 16;
  }

  private generateYears(): void {
    this.years = Array.from({ length: 16 }, (_, i) => this.startYear + i);
  }

  protected previousPage(): void {
    this.startYear -= 16;
    this.generateYears();
  }

  protected nextPage(): void {
    this.startYear += 16;
    this.generateYears();
  }

  protected isSelectedYear(year: number): boolean {
    return year === this.selectedYear();
  }

  protected isCurrentYear(year: number): boolean {
    const todaysDate = new Date();

    return year === todaysDate.getFullYear();
  }

  protected onYearClick(year: number): void {
    this.onYearSelect.emit(year);
  }
}