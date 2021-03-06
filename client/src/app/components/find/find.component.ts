import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FindService } from 'src/app/services/find.service';
import { UserService } from 'src/app/services/user.service';
import { Url } from 'url';
export interface User {
  name: string;
  avatar: String;
  _id: String;
  userName:String;
}

/**
 * @title Display value autocomplete
 */

@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {
  constructor(private use:UserService, private find:FindService){

  }
  
  myControl = new FormControl();
  
  userTemp:User[] = [];
  user:User[]=[];
  userName:String;
  filteredOptions: Observable<User[]>;
  public tempUrl;
  ngOnInit() {
   
    this.find.getUser().then((value)=>{
      console.log(value);
      this.userTemp = value['getUser'] as Array<User>;
    })
    
  }
  Search(){
    if(this.userName == ""){
      this.ngOnInit();
    }else{
      console.log(this.userTemp.length);
      this.user = this.userTemp.filter(res=>{
        console.log(res.userName.toLocaleLowerCase());
        return res.userName.toLocaleLowerCase().match(this.userName.toLocaleLowerCase());
      });
    }
  }
  
  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  
  
}