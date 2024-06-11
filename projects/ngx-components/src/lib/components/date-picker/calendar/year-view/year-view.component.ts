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
  private readonly itemsPerPage: number = 12;

  public ngOnInit(): void {
    this.calculateStartYear();
    this.generateYears();
  }

  private calculateStartYear(): void {
    this.startYear = Math.floor(this.selectedYear() / this.itemsPerPage) * this.itemsPerPage;
  }

  private generateYears(): void {
    this.years = Array.from({ length: this.itemsPerPage }, (_, i) => this.startYear + i);
  }

  protected previousPage(): void {
    this.startYear -= this.itemsPerPage;
    this.generateYears();
  }

  protected nextPage(): void {
    this.startYear += this.itemsPerPage;
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