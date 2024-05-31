import { Directive, OnInit } from '@angular/core';
import { Button } from '../../shared/button';

@Directive({
  selector: '[basicButton]',
  standalone: true
})
export class BasicButtonDirective extends Button implements OnInit {

  public override ngOnInit(): void {
    super.ngOnInit();
    this.addClass('basic-button');
  }
}