import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { logging } from 'protractor';
import * as firebase from 'firebase';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private auth: LoginService) { }

  

  ngOnInit(): void {
  }
  async Login() {
    await this.auth.Login();
  }
  async LogOut() {
    await this.auth.LogOut();
  }
}
