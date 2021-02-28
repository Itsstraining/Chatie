import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user;
  public listConver;
  public listFriends;
  public listFriendReq;

  constructor(private login: LoginService, private httpClient: HttpClient) { }

  //get user account information
  public async getUserInfo(email){
    let temp = await this.httpClient.get(environment.endpoint + `user/getByEmail?email=${email}`).toPromise();
    this.user = temp['getByEmail'];
  }

  public async getAllConver(){
    let tempAllConver = await this.httpClient.get(environment.endpoint + `user/getByEmail?email=${this.user._id}`).toPromise();
    this.listConver = tempAllConver['allUserConver'];
  }

  // public async getConverInfo(){
  //   let tempConverInfo = await this.httpClient.get(environment.endpoint + 'conversation/oneConver?id')
  // }
}
