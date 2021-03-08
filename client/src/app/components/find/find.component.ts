import { AfterContentInit, Component, Inject, OnChanges, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FindService } from 'src/app/services/find.service';
import { UserService } from 'src/app/services/user.service';
import { Url } from 'url';
// export interface User {
//   name: string;
//   avatar: String;
//   _id: String;
//   userName:String;
// }

export interface User {
  userInfo: any;
  status: boolean;
  add: number;
}

/**
 * @title Display value autocomplete
 */

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit, AfterContentInit {
  public userInfo: any;

  constructor(private userService:UserService, private find:FindService, @Inject(MAT_DIALOG_DATA) data) { 
    this.userInfo = data;
}
  
  myControl = new FormControl();
  
  userTemp:User[] = [];
  user:User[]=[];
  userName:String;

  public add: boolean = false;
  
  public tempUrl;
  public listTemp: any;
  
  ngOnInit() {
   
    // this.find.getUser().then((value)=>{
    //   console.log(value);
    //   this.userTemp = value['getUser'] as Array<User>;
    // })
    // this.getInfo();
  }

  ngAfterContentInit(){
    this.getInfo();
  }

  public async getInfo(){
    // await this.find.getUser();
    // this.listTemp = this.find.listRep;
    
    this.userTemp = await this.find.getUser(this.userInfo._id) as Array<User>;
    console.log(this.userTemp.length);
  }

  Search(){
      console.log(this.userTemp.length);
      this.user = this.userTemp.filter(res=>{
        console.log(res.userInfo.userName.toLocaleLowerCase());
        return res.userInfo.userName.toLocaleLowerCase().match(this.userName.toLocaleLowerCase());
      });
    
  }
  // Add()
  // {
  //   let addfriend = await Database.instance.User.addFriend(id);
  // }
  
  displayFn(user: User): string {
    return user && user.userInfo.userName ? user.userInfo.userName : '';
  }

  public async acceptToAddFriend(to, user: User){
    console.log(this.userInfo._id)
    user.add = (await this.find.createAddRequest(this.userInfo._id, to));
  }
  
}