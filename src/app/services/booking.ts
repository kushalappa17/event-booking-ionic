import { Injectable } from '@angular/core';
import { BaseApiService } from './network/base.api.service';
import { BookingRequest, BookingResponse } from '../models/event.types';
import { ApiService } from './network/api-service';

@Injectable({
  providedIn: 'root',
})
export class BookingService extends BaseApiService<BookingRequest> {

  protected endpoint = '/bookings';

  constructor(apiService: ApiService) {
    super(apiService);
  }

  createBooking(payload: BookingRequest) {
    return this.api.post<BookingResponse>(this.endpoint, payload);
  }

  confirmBooking(id: number) {
    return this.api.post<BookingResponse>(`${this.endpoint}/${id}/confirm`, {});
  }

  getBookingDetails(bookingReference: string) {
    return this.api.get<BookingResponse>(`${this.endpoint}/${bookingReference}`);
  }
}
