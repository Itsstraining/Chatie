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
    this.user =  temp['getByEmail'];
  }

  public async getUserById(id){
    let temp = await this.httpClient.get(environment.endpoint + `user/getById?id=${id}`).toPromise();
    return temp['getById'];
  }

  public async getUserAllConver(userId){
    let tempAllConver = await this.httpClient.get(environment.endpoint + `conversation/allUserConver?senderId=${userId}`).toPromise();
    this.listConver = tempAllConver['allUserConver'];
    console.log(typeof this.listConver);
  }

  public async getUserFromDB(){
    let tempAllUser = await this.httpClient.get(environment.endpoint + 'user');
    return tempAllUser['getUser'];
  }

  // public async getConverInfo(){
  //   let tempConverInfo = await this.httpClient.get(environment.endpoint + 'conversation/oneConver?id')
  // }

  public getAllConver(){
    return this.listConver;
  }
}
