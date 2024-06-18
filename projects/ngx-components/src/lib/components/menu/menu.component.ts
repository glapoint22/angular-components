import { Component, input } from '@angular/core';
import { Color, ColorType } from '../../models/color';

@Component({
  selector: 'menu',
  standalone: true,
  imports: [],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
  public color = input<ColorType>('primary');
  protected Color = Color;
}