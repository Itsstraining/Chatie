import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(private auth: LoginService, private router: Router) { }

  ngOnInit(): void {

  }
  async LoginWithGG() {
    await this.auth.Login();
    this.router.navigate(['chat-socket']);
  }
  
}
