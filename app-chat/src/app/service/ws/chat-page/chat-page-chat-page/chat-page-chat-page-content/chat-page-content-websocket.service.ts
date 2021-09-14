import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageOnlineFriends } from 'src/app/models/ws/friends-page/message_online_friends';
import { environment } from 'src/environments/environment.prod';
import { WebsocketService } from '../../../websocket-service/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatPageContentWebsocketService {
  public messages_send: Subject<Object>;
  
  constructor(private ws: WebsocketService) {
    this.reCreate();
   }

  public reCreate() {
    this.messages_send = <Subject<MessageOnlineFriends>>(
      this.ws.connect(environment.CHAT_URL).pipe(
        map((response: MessageEvent): MessageOnlineFriends => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            mes: data.mes,
            data: data.data
          };
        })
      )
    );
   
   
  }

  // gửi request chat 1 : 1
  public sendMessagesPeople(to, mes): void {
    this.messages_send.next({
      action: 'onchat',
      data: {
        event: 'SEND_CHAT',
        data: {
          type: 'people',
          to: to,
          mes: mes
        },
      },
    });
  }

   // gửi request chat nhóm
   public sendMessagesGroup(to, mes): void {
    this.messages_send.next({
      action: 'onchat',
      data: {
        event: 'SEND_CHAT',
        data: {
          type: 'room',
          to: to,
          mes: mes
        },
      },
    });
  }

   

}
