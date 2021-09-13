import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageOnlineFriends } from 'src/app/models/ws/friends-page/message_online_friends';
import { environment } from 'src/environments/environment.prod';
import { WebsocketService } from '../websocket-service/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class MainPageWebsocketService {
  public messages_join_group: Subject<Object>;
  constructor(private ws: WebsocketService) {
    this.reCreate();
  }


   // tạo kết nối
   public reCreate() {
    this.messages_join_group = <Subject<MessageOnlineFriends>>(
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
   // gửi request kiểm tra box chat
   public joinGroup(name): void {
    this.messages_join_group.next({
      action: 'onchat',
      data: {
        event: 'JOIN_ROOM',
        data: {
          name: name,
        },
      },
    });
  }
}
