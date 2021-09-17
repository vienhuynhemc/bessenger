import { environment } from './../../../../environments/environment.prod';
import { WebsocketService } from './../websocket-service/websocket.service';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from 'src/app/models/ws/login/message';
import { MessageLogin } from 'src/app/models/ws/login/message_login';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginWsWsService {

  private REST_API_SERVER = "https://bessenger.000webhostapp.com";

  public messages: Subject<Object>;
  // message login
  public messages_login: Subject<Object>
  // Message logout
  public messages_logout: Subject<Object>;

  constructor(
    private ws: WebsocketService,
    private http: HttpClient
  ) {
    this.reCreate();
  }

  public reCreate() {
    this.messages = <Subject<Message>>this.ws
      .connect(environment.CHAT_URL).pipe(map(
        (response: MessageEvent): Message => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            mes: data.mes
          };
        }));
    this.messages_login = <Subject<MessageLogin>>this.ws
      .connect(environment.CHAT_URL).pipe(map(
        (response: MessageEvent): MessageLogin => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            data: data.data,
            mes: data.mes,
            event:data.event
          };
        }));
    this.messages_logout = <Subject<Message>>this.ws
      .connect(environment.CHAT_URL).pipe(map(
        (response: MessageEvent): Message => {
          const data = JSON.parse(response.data);
          return {
            status: data.status,
            mes: data.mes
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

  public logout() {
    this.messages_logout.next(
      {
        "action": "onchat",
        "data": {
          "event": "LOGOUT"
        }
      }
    )
    this.messages_logout.subscribe(data => {
      let value = JSON.parse(JSON.stringify(data));
      console.log("Đăng xuất: " + value.status + " " + value.mes);
      this.ws.reCreate(environment.CHAT_URL);
      this.reCreate();
    })
  }

  public getPassword() {
    let email = JSON.parse(localStorage.getItem("email_dn_ws"));
    const url = `${this.REST_API_SERVER}/kiem_tra_email_dang_nhap_ws.php?email=${email}`;
    return this.http.get<any>(url);
  }

}
