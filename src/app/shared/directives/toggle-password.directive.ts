import { Directive, HostBinding, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTogglePassword]',
  exportAs: 'toggle',
})

export class TogglePasswordDirective {
  @HostBinding('attr.type') type = 'password';

  get show(): boolean {
    return this.type === 'text';
  }

  constructor(private el: ElementRef) {}

  toggleType() {
    this.type = this.type === 'password' ? 'text' : 'password';
  }
}
