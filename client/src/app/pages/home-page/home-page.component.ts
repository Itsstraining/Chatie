import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user: any;
  constructor(private auth: AngularFireAuth) { }
  public provider = new firebase.default.auth.GoogleAuthProvider();
  public async login() {
    try {
      await this.auth.signInWithPopup(this.provider);
      alert('Đăng nhập thành công');
    } catch (err) {
      console.log(err);
    }
  }

  public async logout() {
    try {
      await this.auth.signOut();
      this.user = null;
      alert('Đăng xuất thành công');
    } catch (err) {
      console.log(err);
    }
  }
  ngOnInit(): void {
    this.auth.authState.subscribe((hello) => {
      if (hello) {
        this.user = hello;
      }
    });
  }
}
