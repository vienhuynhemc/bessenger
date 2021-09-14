import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { MessageOnlineFriends } from 'src/app/models/ws/friends-page/message_online_friends';
import { environment } from 'src/environments/environment.prod';
import { WebsocketService } from '../../websocket-service/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class ChatPageFriendsWebsocketService {
  public messages_online_friends_chat: Subject<Object>;
  public messages_create_group_chat: Subject<Object>;
  public messages_send: Subject<Object>;
  constructor(private ws: WebsocketService) { 
    
  }

   // tạo kết nối
   public reCreate() {
    this.messages_online_friends_chat = <Subject<MessageOnlineFriends>>(
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
    this.messages_create_group_chat = <Subject<MessageOnlineFriends>>(
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

  

   // gửi request kiểm tra box chat
   public checkOnlineFriendsChat(name): void {
    this.messages_online_friends_chat.next({
      action: 'onchat',
      data: {
        event: 'CHECK_USER',
        data: {
          user: name,
        },
      },
    });
  }

   // gửi request kiểm tra box chat
   public createGroup(name): void {
    this.messages_online_friends_chat.next({
      action: 'onchat',
      data: {
        event: 'CREATE_ROOM',
        data: {
          name: name,
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
