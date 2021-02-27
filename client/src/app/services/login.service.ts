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
  constructor(private auth: AngularFireAuth, private client: HttpClient) {
    this.auth.authState.subscribe((test) => {
      if (test) {
        this.user = test;
        console.log(this.user.displayName);
      } else {
        this.user = null;
      }
    });
  }

  async Login() {
    try {
      let provider = new firebase.default.auth.GoogleAuthProvider();
      await this.auth.signInWithPopup(provider).then((data) => {
        this.user = data.user;
      });
      let data = { email: this.user.email, avatar: this.user.photoURL };
      await this.client
        .post(environment.endpoint + 'user/email',data)
        .subscribe((temp) => {
          console.log(temp);
        });
      // await this.auth.signInWithPopup(
      //   new firebase.default.auth.GoogleAuthProvider()
      // );
      alert('login successfully');
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
