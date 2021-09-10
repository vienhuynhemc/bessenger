import { environment } from './../../../../environments/environment.prod';
import { WebsocketService } from './../websocket-service/websocket.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/ws/login/message';

@Injectable({
  providedIn: 'root'
})
export class LoginWsWsService {

  public messages: Subject<Object>;

  constructor(
    private ws: WebsocketService
  ) {
    this.messages = <Subject<Message>>ws
      .connect(environment.CHAT_URL).pipe(map(
        (response: MessageEvent): Message => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            mes:data.mes
          };
        }));
  }
}
