import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase'
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public user: firebase.default.User;
  constructor(private auth: AngularFireAuth) {
    this.auth.authState.subscribe((test) => {
      if (test) {
        this.user = test;
        console.log(this.user.displayName)
      } else {
        this.user = null;
      }
    })
  }

  async Login() {

    try {
      await this.auth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider());
      alert("login successfully")
    }
    catch (erro) {
      alert("Login failed");
    }
  }
  async LogOut() {
    try {
      this.auth.signOut();
      localStorage.removeItem(this.user.toString())
      this.user = null;
      alert('Log Out Success')
      console.clear();
    } catch (err) {
      console.log(err)
    }
  }


}
