import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, filter, switchMap, isEmpty } from 'rxjs';
import { BookingService } from '../services/booking';
import { IonicModule ,NavController} from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking-summary',
  templateUrl: './booking-summary.component.html',
  imports: [IonicModule, CommonModule],
  styleUrls: ['./booking-summary.component.scss'],
})
export class BookingSummaryComponent {

  private route = inject(ActivatedRoute);
  private bookingService = inject(BookingService);
  private router = inject(NavController);

  booking$ = this.route.paramMap.pipe(
    map(params => params.get('id')),
    filter((id): id is string => !!id),
    switchMap(id => this.bookingService.getBookingDetails(id))
  );

  pay(bookingId: number) {
    this.bookingService.confirmBooking(bookingId).subscribe(response => {
      this.router.navigateRoot('/');
    });
  }

}
