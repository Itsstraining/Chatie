import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-find',
  templateUrl: './find.component.html',
  styleUrls: ['./find.component.scss']
})
export class FindComponent implements OnInit {

  constructor(public dialog: MatDialog) { }
  

  ngOnInit(): void {
  }

}
