import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from  '@angular/common/http';
import { map } from  'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class FileService {
  SERVER_URL: string = "https://file.io/";

  constructor(private httpClient: HttpClient) {}
  public upload(formData) {

    return this.httpClient.post<any>(this.SERVER_URL, formData, {  
        reportProgress: true,  
        observe: 'events'  
      });  
  }
}
