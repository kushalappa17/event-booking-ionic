import { Routes } from '@angular/router';
import { AuthGuard } from '../auth.guard';

export const eventRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./event.page').then(m => m.EventPage)
    },
    {
        path: ':id',
        canActivate: [AuthGuard], 
        loadComponent: () => import('./event-details/event-details.component').then(m => m.EventDetailsComponent)
    }
]