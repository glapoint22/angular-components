import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable, inject } from '@angular/core';
import { DialogOptions } from '../models/dialog-options';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  private overlayRef!: OverlayRef;
  private overlay = inject(Overlay);

  public async open(options: DialogOptions): Promise<void> {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    this.overlayRef = this.overlay.create({ positionStrategy, hasBackdrop: true });
    this.overlayRef.backdropClick().subscribe(() => this.close());

    const { DialogComponent: DialogComponent } = await import('./dialog/dialog.component');
    const dialogPortal = new ComponentPortal(DialogComponent);
    const dialog = this.overlayRef.attach(dialogPortal);

    dialog.instance.set(options);
    dialog.instance.onClose.subscribe(() => this.close());
  }


  public close(): void {
    this.overlayRef.detach();
  }
}