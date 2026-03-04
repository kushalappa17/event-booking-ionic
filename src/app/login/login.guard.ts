import { Injectable } from '@angular/core';
import { CanActivate, Route, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, of, take, tap } from 'rxjs';
import { selectIsAuthenticated } from '../lib/auth.selectors';


@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate{

  constructor(private store: Store, private router: Router){}

  canActivate(): Observable<boolean>{
    // console.log('Login guard');
    // return of(true);
    return this.store.select(selectIsAuthenticated).pipe(
      take(1),
      map(isAuth => {
        if(isAuth){
          this.router.navigate(['/']);
          return false;
        }
        return true;
      }),
    )
  }
  
}
