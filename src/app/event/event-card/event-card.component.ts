import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Events } from 'src/app/models/event.types';
import { CommonModule, DatePipe } from '@angular/common';
import { IonIcon } from "@ionic/angular/standalone";

@Component({
  selector: 'app-event-card',
  imports:[CommonModule],
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss'],
})
export class EventCardComponent  {

  @Input({required: true}) event!: Events;
  @Output() viewDetail = new EventEmitter<number>();

  onClick() {
    this.viewDetail.emit(this.event.id);
  }

  getDiscountedPrice(): number {
    return this.event.basePrice - 
      (this.event.basePrice * this.event.flashSaleDiscountPercent / 100);
  }

}
