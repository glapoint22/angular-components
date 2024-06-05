import { Directive } from '@angular/core';
import { Affix } from '../../shared/affix';

@Directive({
  selector: '[suffix]',
  standalone: true
})
export class SuffixDirective extends Affix { }