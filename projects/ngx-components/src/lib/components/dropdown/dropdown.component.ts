import { AfterViewInit, Component, Renderer2, TemplateRef, ViewContainerRef, booleanAttribute, contentChildren, forwardRef, inject, input, viewChild } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownComponent),
    multi: true
  }]
})
export class DropdownComponent implements AfterViewInit, ControlValueAccessor {
  public disabled = input(false, { transform: booleanAttribute });
  private dropdownListTemplate = viewChild<TemplateRef<any>>('dropdownListTemplate');
  private dropdownItems = contentChildren(DropdownItemComponent);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef!: OverlayRef;
  private isOpen!: boolean;
  protected selectedValue!: string;
  private renderer = inject(Renderer2);
  private removeWindowClickListener!: () => void;
  private removeEscapeKeyListener!: () => void;
  private onChange!: (value: any) => void;

  ngAfterViewInit() {
    this.dropdownItems().forEach(item => {
      item.onSelectionChange.subscribe((dropdownItem: DropdownItemComponent) => {
        this.dropdownItems().forEach(item => item === dropdownItem ? item.setSelected(true) : item.setSelected(false));
        this.selectedValue = dropdownItem.value();
        this.onChange(this.selectedValue);
        this.closeList();
      });
    });
  }

  public toggleList(): void {
    if (this.isOpen) {
      this.closeList();
    } else {
      this.openList();
    }
  }


  private openList(): void {
    const positionStrategy = this.overlay.position()
      .flexibleConnectedTo(this.viewContainerRef.element.nativeElement.parentElement)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top'
        }
      ]);

    this.overlayRef = this.overlay.create({ positionStrategy, width: this.viewContainerRef.element.nativeElement.parentElement.clientWidth + 'px' });

    const portal = new TemplatePortal(this.dropdownListTemplate()!, this.viewContainerRef);
    this.overlayRef.attach(portal);

    this.isOpen = true;

    this.removeWindowClickListener = this.renderer.listen('window', 'click', () => this.closeList());
    this.removeEscapeKeyListener = this.renderer.listen('window', 'keydown.escape', () => this.closeList());
  }

  private closeList(): void {
    this.overlayRef.detach();
    this.isOpen = false;
    this.removeWindowClickListener();
    this.removeEscapeKeyListener();
  }


  writeValue(value: any): void {
    this.selectedValue = value;
    this.dropdownItems().forEach(item => item.setSelected(item.value() === value));
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log(isDisabled);
  }
}