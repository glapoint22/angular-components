import { Directive } from '@angular/core';
import { Affix } from '../../shared/affix';

@Directive({
  selector: '[prefix]',
  standalone: true
})
export class PrefixDirective extends Affix { }