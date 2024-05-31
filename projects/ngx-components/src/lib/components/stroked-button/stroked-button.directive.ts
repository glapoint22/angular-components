import { Directive, OnInit } from '@angular/core';
import { Button } from '../../shared/button';

@Directive({
  selector: '[strokedButton]',
  standalone: true
})
export class StrokedButtonDirective extends Button implements OnInit {

  public override ngOnInit(): void {
    super.ngOnInit();
    this.addClass('stroked-button');
  }
}