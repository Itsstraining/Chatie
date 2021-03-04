import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(public login: LoginService, public router: Router) {

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    if (this.login.user) {
      return true;
    } else {
      return this.login.auth.authState.pipe(map(usr => {
        if (usr != null) {
          this.login.user = usr;
          // this._router.navigate(['main-page'])
          return true;
        } else {
          console.log('NULL user');
          this.router.navigate([''])
          return false;
        }
      }));
    }
  }

}
