import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Directive, ElementRef, HostListener, Renderer2, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
  selector: '[datePicker]',
  standalone: true,
  exportAs: 'datePicker',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DatePickerDirective),
    multi: true
  }]
})
export class DatePickerDirective implements ControlValueAccessor {
  private overlayRef!: OverlayRef;
  private elementRef: ElementRef<HTMLInputElement> = inject(ElementRef<HTMLInputElement>);
  private overlay = inject(Overlay);
  private renderer = inject(Renderer2);
  private removeWindowClickListener!: () => void;
  private removeElementRefClickListener!: () => void;
  private removeEscapeKeyListener!: () => void;
  private onChange!: (value: Date) => void;

  @HostListener('blur')
  public onBlur(): void {
    if (this.elementRef.nativeElement.value === '' ||
      this.elementRef.nativeElement.value === null ||
      this.elementRef.nativeElement.value === undefined) return;

    this.elementRef.nativeElement.value = this.formatDate(this.elementRef.nativeElement.value);

    this.onChange(new Date(this.elementRef.nativeElement.value));
  }


  public async toggleCalendar(): Promise<void> {
    if (this.overlayRef && this.overlayRef.hasAttached()) {
      this.closeCalendar();
      return;
    }

    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.elementRef)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetX: -12,
          offsetY: 12
        }
      ]);



    this.overlayRef = this.overlay.create({ positionStrategy });

    const { CalendarComponent } = await import('../calendar/calendar.component');
    const calendar = new ComponentPortal(CalendarComponent);
    const calendarRef = this.overlayRef.attach(calendar);
    const date = this.elementRef.nativeElement.value ? new Date(this.elementRef.nativeElement.value) : new Date();

    calendarRef.instance.setDate(date);
    calendarRef.instance.onDateChange.subscribe((date: Date) => {

      this.elementRef.nativeElement.value = this.formatDate(date);
      this.onChange(date);
      this.closeCalendar();
    });

    this.createListeners();
  }


  private createListeners(): void {
    this.removeWindowClickListener = this.renderer.listen('window', 'click', () => this.closeCalendar());
    this.removeElementRefClickListener = this.renderer.listen(this.elementRef.nativeElement, 'click', (event: MouseEvent) => event.stopPropagation());
    this.removeEscapeKeyListener = this.renderer.listen('window', 'keydown.escape', () => this.closeCalendar());
  }

  private removeListeners(): void {
    this.removeWindowClickListener();
    this.removeElementRefClickListener();
    this.removeEscapeKeyListener();
  }


  private closeCalendar(): void {
    this.overlayRef.detach();
    this.removeListeners();
  }


  private formatDate(value: any): string {
    const date = value instanceof Date ? value : new Date(value);

    return date.toLocaleDateString('en-US', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }


  public writeValue(value: any): void {
    if (!value) return;

    this.elementRef.nativeElement.value = this.formatDate(value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void { }
  public setDisabledState?(isDisabled: boolean): void { }
}