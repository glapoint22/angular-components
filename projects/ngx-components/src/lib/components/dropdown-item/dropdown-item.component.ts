import { CommonModule } from '@angular/common';
import { Component, booleanAttribute, input, output } from '@angular/core';

@Component({
  selector: 'dropdown-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown-item.component.html',
  styleUrl: './dropdown-item.component.scss'
})
export class DropdownItemComponent {
  public disabled = input(false, { transform: booleanAttribute });
  public value = input<any>();
  public onSelectionChange = output<DropdownItemComponent>();
  protected isSelected!: boolean;

  protected onClick(): void {
    this.onSelectionChange.emit(this);
  }

  public setSelected(isSelected: boolean): void {
    this.isSelected = isSelected;
  }
}