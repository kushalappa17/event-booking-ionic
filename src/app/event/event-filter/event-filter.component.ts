import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { EVENT_CATEGORIES, EventCategory } from 'src/app/models/event.enum';
import { EventFilter } from 'src/app/models/event.types';

@Component({
  selector: 'app-event-filter',
  imports:[IonicModule, CommonModule, FormsModule],
  templateUrl: './event-filter.component.html',
  standalone:true,
  styleUrls: ['./event-filter.component.scss'],
})
export class EventFilterComponent implements OnInit {

  @Input() filters: EventFilter | null = null;
  
  selectedCategory: EventCategory | null = null;
  selectedCity: string | null = null;
  selectedDateRange: string[] = [];

  categories: EventCategory[] = EVENT_CATEGORIES;
  cities: string[] = ['Bangalore', 'Mumbai', 'Chennai', 'Hyderabad'];

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    if (this.filters) {
      this.selectedCategory = this.filters.category ?? null;
      this.selectedCity = this.filters.city ?? null;
    }
  }

  apply() {
    let startDate: string | null = null;
    let endDate: string | null = null;

    if (this.selectedDateRange?.length) {
      const sorted = [...this.selectedDateRange].sort();
      startDate = sorted[0];
      endDate = sorted[sorted.length - 1];
    }
    const selectedFilters: EventFilter = {
      category: this.selectedCategory,
      city: this.selectedCity,
      startDate: startDate,
      endDate: endDate
    };

    this.modalCtrl.dismiss(selectedFilters);
  }

  clear() {
    this.selectedCategory = null;
    this.selectedCity = null;
    this.selectedDateRange = [];
  }

  close() {
    this.modalCtrl.dismiss();
  }

}
