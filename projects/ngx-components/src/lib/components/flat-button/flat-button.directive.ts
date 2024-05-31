import { Directive, OnInit } from '@angular/core';
import { Button } from '../../shared/button';

@Directive({
  selector: '[flatButton]',
  standalone: true
})
export class FlatButtonDirective extends Button implements OnInit {

  public override ngOnInit(): void {
    super.ngOnInit();
    this.addClass('flat-button');
  }
}