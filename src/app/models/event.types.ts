import { BookingStatus, EventCategory, EventStatus, PaymentStatus, SeatsStatus } from "./event.enum";

export interface Events {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  eventDate: string;           // ISO date (YYYY-MM-DD)
  startTime: string;           // ISO datetime (YYYY-MM-DDTHH:mm)
  endTime: string;
  venueName: string;
  cityName: string;
  basePrice: number;
  availableSeats: number;
  bannerImageUrl: string | null;
  status: EventStatus;
  flashSaleDiscountPercent: number;
}

export interface Ticket {
  id: number;
  name: string;
  description: string;
  price: number;
  totalQuantity: number;
  availableQuantity: number;
  maxPerBooking: number;
}

export interface Seat {
  id: number;
  seatNumber: string;
  row: string;
  section: string;
  status: SeatsStatus;
  ticketTypeId: number;
  ticketTypeName: string;
}

export interface EventDetailResponse {
  event: Events;
  ticketTypes: Ticket[];
  seats: Seat[];
}
 

export interface EventFilter {
  category?: EventCategory | null;
  city?: string | null;
  startDate?: string | null;
  endDate?: string | null;
}

export interface BookingRequest {

  eventId: number;
  seatIds: number[];
  ticketTypeIds: number[];

  // Seat snapshots
  seatNumberSnapshots: string[];
  sectionSnapshots: string[];
  ticketTypeNameSnapshots: string[];
  unitPrices: number[];

  // Event snapshots
  eventTitleSnapshot: string;
  eventDateSnapshot: string; // ISO string e.g. "2024-12-25T18:00:00"
  venueSnapshot: string;
  citySnapshot: string;

  // Idempotency key
  idempotencyKey: string;
}

/**
 * Represents a specific ticket or seat within a booking.
 * Optimized for high-density UI rendering and event-driven updates.
 */
export interface BookingItem {
  id: number;
  seatId: number;
  seatNumber: string;
  section: string;
  ticketTypeName: string;
  unitPrice: number;
  ticketCode: string;
  ticketStatus: SeatsStatus;
}

/**
 * TypeScript equivalent of the Java BookingResponse class.
 * Built for high-frequency data exchange and reactive state management. [cite: 9, 12]
 */
export interface BookingResponse {
  bookingId: number;
  bookingReference: string;
  status: BookingStatus
  eventTitle: string;
  eventDate: string; 
  venue: string;
  city: string;
  bookingItems: BookingItem[];
  subtotal: number;
  discountAmount: number;
  totalAmount: number;
  paymentStatus: PaymentStatus;
  createdAt: string | Date; 
}