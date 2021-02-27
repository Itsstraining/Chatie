import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public user: any;
  constructor(public auth: LoginService, private router: Router) { 
    
  }

  ngOnInit(): void {
    this.user=this.auth.user;
  }
  
  async LogOut() {
    await this.auth.LogOut();
    this.router.navigate(['']);
  }
}
