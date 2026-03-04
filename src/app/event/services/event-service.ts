import { Injectable } from '@angular/core';
import { EventDetailResponse, EventFilter, Events } from 'src/app/models/event.types';
import { ApiService } from 'src/app/services/network/api-service';
import { BaseApiService } from 'src/app/services/network/base.api.service';

@Injectable({
  providedIn: 'root',
})
export class EventService extends BaseApiService<Event>{

  protected  endpoint = '/events';

  constructor(apiService: ApiService){
    super(apiService);
  }

  getEvents(filters ?: EventFilter){
    return this.api.get<Events[]>(this.endpoint, filters);
  }

  getEventDetails(id: number){
    return this.api.get<EventDetailResponse>(`${this.endpoint}/${id}`);
  }

  private getUserIdFromToken(token: string): number {
    const payload = token.split('.')[1];
    const decoded = JSON.parse(atob(payload));
    return decoded.userId as number;
  }

  buildIdempotencyKey(token: string, eventId: number, seatIds: number[]): string {
    const userId = this.getUserIdFromToken(token);
    const seatsStr = [...seatIds].sort((a, b) => a - b).join('-');
    return `user-${userId}-event-${eventId}-seats-${seatsStr}`;
  }
  
}
