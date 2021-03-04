import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public user: firebase.default.User = null;
  public newUser;
  public idToken;
  constructor(public auth: AngularFireAuth, private client: HttpClient) {
    this.auth.authState.subscribe((test) => {
      if (test) {
        this.user = test;
        console.log(this.user.displayName);
      } else {
        this.user = null;
      }
    })
    // console.log(this.user.uid);
  }
  public isAuthenticated(): boolean {
    if(this.user!=undefined){
      return true;
    }
    
    // Check whether the token is expired and return
    // true or false
    return false
  }
  async Login() {
    try {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      await this.auth.signInWithPopup(provider).then((data) => {
        this.user = data.user;
      });
      // //get user token
      // this.idToken = this.user.getIdToken();
      let data = { email: this.user.email, avatar: this.user.photoURL };
      await this.client
        .post(environment.endpoint + 'user/email',data)
        .subscribe((temp) => {
          console.log(temp);
        });
      alert('login successfully');
      // return { idToken: this.idToken, user: this.user };
    } catch (erro) {
      alert('Login failed');
    }
  }

  async LogOut() {
    try {
      this.auth.signOut();
      localStorage.removeItem(this.user.toString());
      this.user = null;
      alert('Log Out Success');
      console.clear();
    } catch (err) {
      console.log(err);
    }
  }
}
