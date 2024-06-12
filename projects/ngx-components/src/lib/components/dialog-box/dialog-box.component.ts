import { Component, output } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FlatButtonDirective } from '../flat-button/flat-button.directive';
import { StrokedButtonDirective } from '../stroked-button/stroked-button.directive';
import { DialogOptions } from '../../models/dialog-options';

@Component({
  selector: 'dialog-box',
  standalone: true,
  imports: [IconComponent, FlatButtonDirective, StrokedButtonDirective],
  templateUrl: './dialog-box.component.html',
  styleUrl: './dialog-box.component.scss'
})
export class DialogBoxComponent {
  public onClose = output<void>();
  protected options!: DialogOptions;
  // protected title!: string;
  // protected message!: string;
  

  public set(dialogOptions: DialogOptions): void {
    this.options = dialogOptions;
    // this.title = DialogOptions.title;
    // this.message = DialogOptions.message;
  }

  public close(): void {
    this.onClose.emit();
  }
}