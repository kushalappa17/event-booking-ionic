import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { IonicModule, ModalController, NavController } from '@ionic/angular';
import { BehaviorSubject, shareReplay, switchMap, tap } from 'rxjs';
import { EventFilter } from '../models/event.types';
import { EventCardComponent } from './event-card/event-card.component';
import { EventFilterComponent } from './event-filter/event-filter.component';
import { EventService } from './services/event-service';


@Component({
  selector: 'app-event',
  templateUrl: 'event.page.html',
  styleUrls: ['event.page.scss'],
  imports: [IonicModule, CommonModule, EventCardComponent],
})
export class EventPage {

  currentFilters !: EventFilter;
  activeFilterCount = 0;
  loading = false;

  private eventsService = inject(EventService);
  private filtersSubject = new BehaviorSubject<EventFilter>({});

  events$ = this.filtersSubject.pipe(
      switchMap( filters => this.eventsService.getEvents(filters)
    ),
    tap(() => this.loading = false),
    shareReplay(1)
  )

  constructor(private navCtrl: NavController, private modal: ModalController) { }

  refresh(ev: any) {
    this.filtersSubject.next(this.filtersSubject.value);
    setTimeout(() => {
      ev.detail.complete();
    }, 600); 
  }

  goToDetail(id: number) {
    this.navCtrl.navigateForward(`/events/${id}`, { animated: true, animationDirection: 'forward'});
  }

  async openFilter() {
    const modal = await this.modal.create({
      component: EventFilterComponent,
      componentProps: {
        filters: this.currentFilters
      }
    });

    await modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.currentFilters = data;
      this.activeFilterCount = Object.values(data).filter(v => v !== null && v !== '').length;
      this.filtersSubject.next(this.currentFilters);
    }
  }
}
