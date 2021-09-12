import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageOnlineFriends } from 'src/app/models/ws/friends-page/message_online_friends';
import { Message } from 'src/app/models/ws/login/message';
import { environment } from 'src/environments/environment.prod';
import { WebsocketService } from '../../websocket-service/websocket.service';

@Injectable({
  providedIn: 'root',
})
export class FriendsPageWebSocketService {
  public messages_online: Subject<Object>;

  constructor(private ws: WebsocketService) {
    this.reCreate();
  }
  
  // tạo kết nối
  public reCreate() {
    this.messages_online = <Subject<MessageOnlineFriends>>(
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

  // gửi request
  public checkOnline(name): void {
    this.messages_online.next({
      action: 'onchat',
      data: {
        event: 'CHECK_USER',
        data: {
          user: name,
        },
      },
    });
  }
}
