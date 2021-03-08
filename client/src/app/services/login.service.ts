import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  
  public user: firebase.default.UserInfo;
  public newUser: any = null;
  public idToken;
  constructor(public auth: AngularFireAuth, private client: HttpClient) {
    this.auth.authState.subscribe((test) => {
      if (test) {
        this.user = test;
      } else {
        this.user = null;
      }
    })
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
      let data = { email: this.user.email, userName: this.user.displayName, avatar: this.user.photoURL};
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

  async loginByAccount(email,password)
  {
    try{
      let result;
      this.newUser = await this.client.get(environment.endpoint+`user/check?email=${email}&password=${password}`).toPromise();
      localStorage.setItem("user", JSON.stringify(this.newUser.user));
       return this.newUser;
    }catch(err){
      console.log(err)
    }
   
  }
}