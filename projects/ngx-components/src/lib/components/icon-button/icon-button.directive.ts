import { Directive, OnInit } from '@angular/core';
import { Button } from '../../shared/button';

@Directive({
  selector: '[iconButton]',
  standalone: true
})
export class IconButtonDirective extends Button implements OnInit {

  public override ngOnInit(): void {
    super.ngOnInit();
    this.addClass('icon-button');
  }

}
