import { Routes } from '@angular/router';
import { LoginGuard } from './login/login.guard';
import { AuthGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: 'login',
        canActivate:[LoginGuard],
        loadComponent:() => import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: '', redirectTo: 'events', pathMatch: 'full'},
    {
        path: 'events',
        canActivate: [AuthGuard],
        loadChildren: () => import('./event/event.route').then(m => m.eventRoutes)
    },
     {
        path: 'booking-summary/:id',
        loadComponent: () => import('./booking-summary/booking-summary.component').then(m => m.BookingSummaryComponent)
    }
];