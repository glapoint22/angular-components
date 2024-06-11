import { Directive, OnInit } from '@angular/core';
import { Button } from '../../shared/button';
import { Color } from '../../models/color';

@Directive({
  selector: '[iconButton]',
  standalone: true
})
export class IconButtonDirective extends Button implements OnInit {

  public override ngOnInit(): void {
    this.addClass('button');
    this.addClass('icon-button');
    
    if (this.color())
      this.addClass(Color.getColorClass(this.color(), 'button'));
  }
}