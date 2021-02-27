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
    console.log(this.auth.user)
  }

  ngOnInit(): void {
<<<<<<< HEAD
    this.user=this.auth.user;
=======
    console.log(this.auth.user)

>>>>>>> d1afa90385d98bd76feff9b19d493a82dc0f7614
  }
  
  async LogOut() {
    await this.auth.LogOut();
    this.router.navigate(['']);
  }
}
