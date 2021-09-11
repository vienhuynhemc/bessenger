import { environment } from './../../../../environments/environment.prod';
import { WebsocketService } from './../websocket-service/websocket.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/ws/login/message';
import { MessageLogin } from 'src/app/models/ws/login/message_login';

@Injectable({
  providedIn: 'root'
})
export class LoginWsWsService {

  public messages: Subject<Object>;
  // message login
  public messages_login: Subject<Object>;

  constructor(
    private ws: WebsocketService
  ) {
    this.messages = <Subject<Message>>ws
      .connect(environment.CHAT_URL).pipe(map(
        (response: MessageEvent): Message => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            mes: data.mes
          };
        }));
    this.messages_login = <Subject<MessageLogin>>ws
      .connect(environment.CHAT_URL).pipe(map(
        (response: MessageEvent): MessageLogin => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            data: data.data,
            mes:data.mes
          };
        }));
  }

  public login(tk, mk): void {
    this.messages_login.next(
      {
        "action": "onchat",
        "data": {
          "event": "LOGIN",
          "data": {
            "user": tk,
            "pass": mk
          }
        }
      }
    );
  }
  
}
