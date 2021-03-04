import { Component, OnInit } from '@angular/core';
import { PushNotificationsService } from 'src/app/services/pushnotification.service';

@Component({
  selector: 'app-pushnotifying',
  templateUrl: './pushnotifying.component.html',
  styleUrls: ['./pushnotifying.component.scss']
})
export class PushnotifyingComponent implements OnInit {

  public title: string = 'Browser Push Notifications!';
 
    constructor(private _notificationService: PushNotificationsService) {
        this._notificationService.requestPermission();
    }
 
    ngOnInit() {}
 
    notify() {
        let data: Array < any >= [];
        data.push({
            'title': 'Approval',
            'alertContent': 'This is First Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Request',
            'alertContent': 'This is Second Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Leave Application',
            'alertContent': 'This is Third Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'Approval',
            'alertContent': 'This is Fourth Alert -- By Debasis Saha'
        });
        data.push({
            'title': 'To Do Task',
            'alertContent': 'This is Fifth Alert -- By Debasis Saha'
        });
 
        this._notificationService.generateNotification(data);
    }
}