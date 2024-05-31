import { Directive, OnInit } from '@angular/core';
import { Button } from '../../shared/button';

@Directive({
  selector: '[raisedButton]',
  standalone: true
})
export class RaisedButtonDirective extends Button implements OnInit {

  public override ngOnInit(): void {
    super.ngOnInit();
    this.addClass('raised-button');
  }
}
