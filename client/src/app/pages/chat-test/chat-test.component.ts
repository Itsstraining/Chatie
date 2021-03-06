import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat-test',
  templateUrl: './chat-test.component.html',
  styleUrls: ['./chat-test.component.scss']
})

export class ChatTestComponent implements OnInit {
  public textArea: string = '';
   public isEmojiPickerVisible: boolean;
   public addEmoji(event) {
      this.textArea = `${this.textArea}${event.emoji.native}`;
      this.isEmojiPickerVisible = true;
      
   }
  
   

  constructor() { }
  ngOnInit(): void {
  }


}
