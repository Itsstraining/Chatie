import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class FindService {

  constructor(private client:HttpClient) { }
   getUser()
  {
    let registerUrl ="http://192.168.31.245:8080/user/";
    return this.client.get(registerUrl).toPromise();
  }
  // addFriend(id,friendId)
  // {
  //   let registerUrl ="http://localhost:8080/friend/addfriendrequest";
  //   return this.client.put(registerUrl,id,friendId);
  // }
}
