import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EventPage } from './event.page';

describe('HomePage', () => {
  let component: EventPage;
  let fixture: ComponentFixture<EventPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
