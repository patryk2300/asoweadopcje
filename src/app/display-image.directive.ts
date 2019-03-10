import { Directive, HostListener, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[displayImage]'
})
export class DisplayImageDirective {

  @Output('clicked') clicked = new EventEmitter<boolean>();

  constructor() { }

  @HostListener('click',['$event'])
  onClick($event: MouseEvent){
    $event.preventDefault();

    this.clicked.emit(true);
  }

}
