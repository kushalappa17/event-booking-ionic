import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { Store } from '@ngrx/store';
import { loadAuthFromStorage } from './lib/auth.actions';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: `<router-outlet />`
})
export class AppComponent {

  private mediaQuery!: MediaQueryList;
  private mediaQueryListener!: (event: MediaQueryListEvent) => void;


  constructor(private store: Store) {
    this.store.dispatch(loadAuthFromStorage());
  }

  ngOnInit() {
    this.initializeTheme();
  }

  ngOnDestroy() {
    // Clean up listener to avoid memory leaks
    if (this.mediaQuery && this.mediaQueryListener) {
      this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }

  private initializeTheme() {
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.applyTheme(this.mediaQuery.matches);
    this.mediaQueryListener = (event: MediaQueryListEvent) => {
      this.applyTheme(event.matches);
    };
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
  }

  private applyTheme(isDark: boolean) {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }
}
