import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingRequest, EventDetailResponse } from 'src/app/models/event.types';
import { IonicModule,NavController} from '@ionic/angular';
import { EventService } from '../services/event-service';
import { map, filter, switchMap, tap, take, firstValueFrom } from 'rxjs';
import { BookingService } from 'src/app/services/booking';
import { Store } from '@ngrx/store';
import { selectToken } from 'src/app/lib/auth.selectors';


@Component({
  selector: 'app-event-details',
  imports: [CommonModule, IonicModule],
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss'],
})
export class EventDetailsComponent {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private eventService = inject(EventService);
  private bookingService = inject(BookingService);
  private navCtrl = inject(NavController);
  private store = inject(Store);

  eventDetails!: EventDetailResponse;
  seatMap: Record<number, any[]> = {};
  selectedSeats: any[] = [];

  data1$ = this.route.paramMap.pipe(
    map(params => Number(params.get('id'))),
    filter(id => !isNaN(id)),
    switchMap(id => this.eventService.getEventDetails(id)),
    tap(data => {
      this.eventDetails = data;
      this.groupSeats(data)
    })
  );

  private groupSeats(data: EventDetailResponse) {
    this.seatMap = {};  // ✅ clear before grouping
    data.seats.forEach(seat => {
      if (!this.seatMap[seat.ticketTypeId]) {
        this.seatMap[seat.ticketTypeId] = [];
      }
      this.seatMap[seat.ticketTypeId].push({
        ...seat,
        isSelected: false
      });
    });
    Object.keys(this.seatMap).forEach(key => {
      this.seatMap[+key].sort((a, b) => a.id - b.id);
    });
  }

  toggleSeat(seat: any, ticketType: any) {

    if (seat.status !== 'AVAILABLE') return;

    const selectedForType = this.selectedSeats
      .filter(s => s.ticketTypeId === ticketType.id);

    if (!seat.isSelected && selectedForType.length >= ticketType.maxPerBooking) {
      return; // prevent exceeding max per booking
    }

    seat.isSelected = !seat.isSelected;

    if (seat.isSelected) {
      this.selectedSeats.push(seat);
    } else {
      this.selectedSeats = this.selectedSeats.filter(s => s.id !== seat.id);
    }
  }

  getTotal(): number {
    return this.selectedSeats.reduce((total, seat) => {
      const ticketType = this.eventDetails.ticketTypes
        .find(t => t.id === seat.ticketTypeId);
      return total + (ticketType?.price || 0);
    }, 0);
  }

  async book() {
    const token = await firstValueFrom(this.store.select(selectToken));
    const selectedSeatIds = this.selectedSeats.map(s => s.id);
    if (this.selectedSeats.length === 0) return;

    const payload: BookingRequest = {
      eventId: this.eventDetails.event.id,
      seatIds: selectedSeatIds,
      ticketTypeIds: this.selectedSeats.map(s => s.ticketTypeId),

      seatNumberSnapshots: this.selectedSeats.map(s => s.seatNumber),
      sectionSnapshots: this.selectedSeats.map(s => s.section),
      ticketTypeNameSnapshots: this.selectedSeats.map(s => s.ticketTypeName),
      unitPrices: this.selectedSeats.map(s => {
        const ticket = this.eventDetails.ticketTypes
          .find(t => t.id === s.ticketTypeId);
        return ticket?.price ?? 0;
      }),

      eventTitleSnapshot: this.eventDetails.event.title,
      eventDateSnapshot: this.eventDetails.event.startTime,
      venueSnapshot: this.eventDetails.event.venueName,
      citySnapshot: this.eventDetails.event.cityName,

      idempotencyKey: this.eventService.buildIdempotencyKey(token, this.eventDetails.event.id, selectedSeatIds)
    };

    this.bookingService.createBooking(payload).subscribe(response => {
      this.router.navigate(['/booking-summary', response.bookingReference]);
    });
  }

  goBack() {
    this.navCtrl.navigateBack('/events', {
        animated: true,
        animationDirection: 'back',
        replaceUrl: true
    });
}
}
