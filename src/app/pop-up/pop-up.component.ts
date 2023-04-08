import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-pop-up',
  templateUrl: './pop-up.component.html',
  styleUrls: ['./pop-up.component.css']
})
export class PopUpComponent {
  @Output() denialEvent = new EventEmitter<boolean>();
  @Output() confirmEvent = new EventEmitter<boolean>();

  onDeny(){
    this.denialEvent.emit(false);
  }

  onConfirm(){
    this.confirmEvent.emit(true);
  }
}
