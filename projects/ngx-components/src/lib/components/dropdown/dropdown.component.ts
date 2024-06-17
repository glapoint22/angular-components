import { AfterViewInit, Component, Renderer2, TemplateRef, ViewContainerRef, booleanAttribute, contentChildren, forwardRef, inject, input, output, viewChild } from '@angular/core';
import { IconComponent } from '../icon/icon.component';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'dropdown',
  standalone: true,
  imports: [CommonModule, IconComponent],
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
  public onDropdownListMousedown = output<void>();
  public onDropdownItemClick = output<void>();
  private dropdownListTemplate = viewChild<TemplateRef<any>>('dropdownListTemplate');
  private dropdownItems = contentChildren(DropdownItemComponent);
  private overlay = inject(Overlay);
  private viewContainerRef = inject(ViewContainerRef);
  private overlayRef!: OverlayRef;
  private isDropdownListOpen!: boolean;
  protected selectedValue!: string;
  private renderer = inject(Renderer2);
  private removeEscapeKeyListener!: () => void;
  private removeKeydownListener!: () => void;
  private onChange!: (value: any) => void;
  private selectedDropdownItemIndex!: number;
  protected isDropdownListMousedown!: boolean;
  protected dropdownListItemSelected!: boolean;

  ngAfterViewInit() {
    this.dropdownItems().forEach(item => {
      item.onDropdownItemClick.subscribe((dropdownItem: DropdownItemComponent) => {
        this.removeKeydownListener();
        this.dropdownListItemSelected = false;
        this.onDropdownItemClick.emit();
        this.setSelectedItem(dropdownItem);
        this.closeList();
      });
    });
  }

  public toggleList(): void {
    if (this.isDropdownListOpen) {
      this.closeList();
    } else {
      this.openList();
    }
  }


  private setSelectedItem(item: DropdownItemComponent): void {
    this.dropdownItems().forEach((dropdownItem: DropdownItemComponent, index: number) => {
      dropdownItem.setSelected(dropdownItem === item);
      if (dropdownItem === item) {
        this.selectedDropdownItemIndex = this.getSelectedDropdownItemIndex(index);
      }
    });

    this.selectedValue = item.value();
    this.onChange(this.selectedValue);
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

    this.isDropdownListOpen = true;

    this.removeEscapeKeyListener = this.renderer.listen('window', 'keydown.escape', () => this.closeList());
  }





  private onArrowKeyPress(arrow: number): void {
    const index = this.selectedDropdownItemIndex = this.getSelectedDropdownItemIndex(this.selectedDropdownItemIndex + arrow);
    const dropdownItem = this.dropdownItems()[index];

    this.setSelectedItem(dropdownItem);
  }

  public onFocus(): void {
    this.createKeydownListener();
  }

  public onBlur(): void {
    if (this.isDropdownListMousedown) {
      this.isDropdownListMousedown = false;
      return;
    }

    this.removeKeydownListener();
    this.closeList();
  }

  protected dropdownListMousedown(): void {
    this.isDropdownListMousedown = true;
    this.dropdownListItemSelected = true;
    this.onDropdownListMousedown.emit();
  }


  private createKeydownListener(): void {
    this.removeKeydownListener = this.renderer.listen('window', 'keydown', (event: KeyboardEvent) => {
      const { key, altKey } = event;

      if (['ArrowDown', 'ArrowUp', 'Enter'].includes(key)) {
        event.preventDefault();

        if (altKey || key === 'Enter') {
          this.toggleList();
        } else {
          this.onArrowKeyPress(key === 'ArrowDown' ? 1 : -1);
        }
      }
    });
  }


  private closeList(): void {
    this.overlayRef.detach();
    this.isDropdownListOpen = false;
    this.removeEscapeKeyListener();
  }

  private getSelectedDropdownItemIndex(index: number): number {
    return Math.min(Math.max(0, index), this.dropdownItems().length - 1);
  }


  writeValue(value: any): void {
    this.selectedValue = value;
    this.dropdownItems().forEach((dropdownItem: DropdownItemComponent, index: number) => {
      if (dropdownItem.value() === value) {
        dropdownItem.setSelected(true);
        this.selectedDropdownItemIndex = this.getSelectedDropdownItemIndex(index);
      } else {
        dropdownItem.setSelected(false);
      }
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    // throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
  }
}