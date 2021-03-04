import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConversationService {

  public converInfo: any;

  constructor(private httpClient: HttpClient) { }

  //get conversation information (participants, message)
  public async getConverInfo(ConverId){
      let tempConver = await this.httpClient.get(environment.endpoint + `conversation/oneConver?conversationId=${ConverId}`).toPromise();
     return tempConver['conversation'];
    }

    //get the content and time of message
  public async getMessContent(messId){
    let tempMess = await this.httpClient.get(environment.endpoint + `mess/getMessageID?id=${messId}`).toPromise();
    return tempMess['content'];
  }

  public async getAllMessContent(conversationId){
    let tempMess = await this.httpClient.get(environment.endpoint + `mess/getAllMessageId?conversationId=${conversationId}`).toPromise();
    return tempMess['messageContent'];
  }

  //send message
  public async sendMess(senderId, conversationId, message){
    let data = { senderId: senderId, conversationId: conversationId, message: message}
    let tempMess = await this.httpClient.put(environment.endpoint + 'conversation/sendMess', data).toPromise();
    console.log(tempMess['newMess']);
  }
}
