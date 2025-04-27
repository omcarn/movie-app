import { Directive, ElementRef, EventEmitter, Output, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appIframeLoad]',
  standalone: true,
})
export class IframeLoadDirective implements AfterViewInit {
  @Output() iframeLoaded = new EventEmitter<void>();

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    this.el.nativeElement.addEventListener('load', () => {
      this.iframeLoaded.emit();
    });
  }
}
