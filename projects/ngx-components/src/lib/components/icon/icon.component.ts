import { CommonModule } from '@angular/common';
import { Component, Signal, booleanAttribute, computed, input } from '@angular/core';

@Component({
  selector: 'icon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss'
})
export class IconComponent {
  public fill = input(false, { transform: booleanAttribute });
  public wght = input<number>(400);
  public grad = input<number>(0);
  public opsz = input<number>(24);
  public fontSize = input<number>(24);
  protected fontVariationSettings!: string;

  public ngOnInit(): void {
    const isFill: Signal<number> = computed(() => this.fill() ? 1 : 0);

    this.fontVariationSettings = `
    'FILL' ${isFill()},
    'wght' ${this.wght()},
    'GRAD' ${this.grad()},
    'opsz' ${this.opsz()}`;
  }
}