import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { Router, CanActivate } from '@angular/router';
import { LoginService } from './login.service';
=======
>>>>>>> d1afa90385d98bd76feff9b19d493a82dc0f7614

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

<<<<<<< HEAD
  constructor(public auth: LoginService, public router: Router) {
    

  }
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
=======
  constructor() { }
}
>>>>>>> d1afa90385d98bd76feff9b19d493a82dc0f7614
