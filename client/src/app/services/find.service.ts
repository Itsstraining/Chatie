import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FindService {
  public status: boolean = false;
  public listRep = [];

  constructor(private client: HttpClient) {}
  public async getUser(userId) {
    let tempList = ( await this.client.get(environment.endpoint + 'user').toPromise())['getUser'];
    let tempFriendList = (await this.client.get(environment.endpoint + `user/getfriendlist?userId=${userId}`).toPromise())['tempListFriend'];
    if (tempFriendList) {
      for (let i = 0; i < tempList.length; i++) {
        for (let j = 0; j < tempFriendList.length; j++) {
          if (tempList[i]._id == tempFriendList[j]) {
            this.status = true;
            this.listRep.push({
              userInfo: tempList[i],
              status: this.status,
              add: 1
            });
            continue;
          }
        };
        this.status = false;
        this.listRep.push({
          userInfo: tempList[i],
          status: this.status,
          add: 0
        });
      }
    }
    console.log(this.listRep)
    return this.listRep;
  }

  public async createAddRequest(from, to){
    let data = { to: to, from: from}
    let temp = await this.client.post(environment.endpoint + 'friend/addfriendrequest', data).toPromise();
    return -1;
  }

  public async getAllFriendRequest(userId){
    let temp = await this.client.get(environment.endpoint + `friend/getlistrequest?userId=${userId}`).toPromise();
    return temp;
  }

  public async addFriend(from, to , status){
    let data = {from: from, to: to, status: status}
    let temp = await this.client.put(environment.endpoint + 'friend/checkrequestlist', data).toPromise();
    return temp['mess'];
  }
}
