import { Component, ElementRef, HostListener, OnInit, output, viewChild } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { FlatButtonDirective } from '../flat-button/flat-button.directive';
import { StrokedButtonDirective } from '../stroked-button/stroked-button.directive';
import { DialogOptions } from '../../models/dialog-options';
import { Color, ColorType } from '../../models/color';

@Component({
  selector: 'dialog-box',
  standalone: true,
  imports: [IconComponent, FlatButtonDirective, StrokedButtonDirective],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent implements OnInit {
  public onClose = output<void>();
  private actionButton = viewChild<ElementRef<HTMLButtonElement>>('actionButton');
  private cancelButton = viewChild<ElementRef<HTMLButtonElement>>('cancelButton');
  protected color: ColorType;
  protected options!: DialogOptions;
  Color = Color;

  public ngOnInit(): void {
    if (this.options.defaultFocus === 'action') {
      this.actionButton()?.nativeElement.focus();
    } else {
      this.cancelButton()?.nativeElement.focus();
    }
  }


  public set(dialogOptions: DialogOptions): void {
    this.options = dialogOptions;
    this.color = dialogOptions.color || 'primary';
  }

  public close(): void {
    this.onClose.emit();
  }

  @HostListener('document:keydown.escape')
  public onEscape(): void {
    this.close();
  }
}