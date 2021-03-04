import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Url } from 'url';
export interface User {
  name: string;
  avatar: String;
  
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
  constructor(){

  }
  myControl = new FormControl();
  options: User[] = [
    {name: 'Trung Đẹp trai', avatar:'../../../assets/images/chatie-logo.png'},
    {name: 'Phú Lếu', avatar:'../../../assets/images/avatar-1.jpg'},
    {name: 'Uyên Múp',avatar:'../../../assets/images/avatar.png'},
    {name: 'Quang Chảy', avatar:'../../../assets/images/logo.png'}
  ];
  filteredOptions: Observable<User[]>;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.options.slice())
      );
  }

  displayFn(user: User): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): User[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}