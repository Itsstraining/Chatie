import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { RegisterService } from 'src/app/services/register.service';

@Component({
  selector: 'app-chat-signup',
  templateUrl: './chat-signup.component.html',
  styleUrls: ['./chat-signup.component.scss']
})
export class ChatSignupComponent implements OnInit {
  constructor(private register: RegisterService,private router: Router) { }
  public email: String;
  public userName: String;
  public password: String;
  ngOnInit(): void {
  }

  async registerAccount() {
    let temp = await this.register.registerAccount(this.email, this.userName, this.password)
    console.log("regiss!! " + temp.message)
    if (temp.message == "This email is already existed") {
      alert("This email is already existed")
    }else {
      alert("Sign up success")
      this.router.navigate(['/'])
    }
  }

}
