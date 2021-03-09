import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FindService {
  public status: boolean = false;

  constructor(private client: HttpClient) {}

  public async getFriendList(userId){
    let tempFriendList = await this.client.get(environment.endpoint + `user/getfriendlist?userId=${userId}`).toPromise();
    return tempFriendList['tempListFriend'];
  }

  public async getUser(userId) {
    let listRep = [];
    let tempList = (
      await this.client.get(environment.endpoint + 'user').toPromise()
    )['getUser'];
    let tempFriendList = (
      await this.client
        .get(environment.endpoint + `user/getfriendlist?userId=${userId}`)
        .toPromise()
    )['tempListFriend'];
    if (tempFriendList) {
      for (let i = 0; i < tempList.length; i++) {
        let temp = 0;
        for (let j = 0; j < tempFriendList.length; j++) {
          if (tempList[i]._id == tempFriendList[j]) {
            this.status = true;
            listRep.push({
              userInfo: tempList[i],
              status: this.status,
              add: 1,
            });
            temp++;
            continue;
          }
        }
        if(tempList[i]._id == userId){
          continue;
        }
        if (temp == 0) {
          this.status = false;
          listRep.push({
            userInfo: tempList[i],
            status: this.status,
            add: 0,
          });
        }
      }
    }
    return listRep;
  }

  public async createAddRequest(from, to) {
    let data = { to: to, from: from };
    let temp = await this.client
      .post(environment.endpoint + 'friend/addfriendrequest', data)
      .toPromise();
    return -1;
  }

  public async getAllFriendRequest(userId) {
    let temp = await this.client
      .get(environment.endpoint + `friend/getlistrequest?userId=${userId}`)
      .toPromise();
    return temp;
  }

  public async addFriend(from, to, status) {
    let data = { from: from, to: to, status: status };
    let temp = await this.client
      .put(environment.endpoint + 'friend/checkrequestlist', data)
      .toPromise();
    return temp;
  }

  public async deleteFriend(id, friendId){
    let data = { id: id, friendId: friendId};
    let tempMess = await this.client.put(environment.endpoint + 'user/deleteFriend', data).toPromise();
    return tempMess;
  }
}
