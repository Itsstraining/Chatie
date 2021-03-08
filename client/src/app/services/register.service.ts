import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  data: []
  constructor(private http: HttpClient) { }
  async registerAccount(email,userName,password){ 
    let result;
    let temp;
    // let registerUrl ="http://192.168.31.245:8080/user/createAccount"
   result = await this.http.post(environment.endpoint+ 'user/createAccount',{
    email:email, 
    userName:userName , 
    password: password
   }).toPromise().then(data=>{ 
     temp=data;
   })
   return temp
  }
}
 

