export type EventStatus =  'DRAFT'|'PUBLISHED'|'SOLD_OUT'|'CANCELLED'|'COMPLETED';

export type EventCategory = 'MUSIC'| 'SPORTS'| 'THEATER'| 'COMEDY'| 'CONFERENCE'| 'WORKSHOP'|'FESTIVAL'| 'ART'| 'FOOD'|'TECHNOLOGY'|'OTHER';

export type SeatsStatus = 'AVAILABLE'|'HELD'| 'BOOKED'|'UNAVAILABLE';

export type BookingStatus = 'PENDING'|'CONFIRMED'|'CANCELLED'| 'REFUNDED'|'FAILED'

export type PaymentStatus = 'INITIATED'|'PENDING'| 'SUCCESS'| 'FAILED'|'REFUNDED'|'PARTIALLY_REFUNDED'

export const EVENT_CATEGORIES: EventCategory[] = [
  'MUSIC',
  'SPORTS',
  'THEATER',
  'COMEDY',
  'CONFERENCE',
  'WORKSHOP',
  'FESTIVAL',
  'ART',
  'FOOD',
  'TECHNOLOGY',
  'OTHER'
];


