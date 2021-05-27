import { Injectable } from '@angular/core';
import { UserChat } from 'src/models/user_chat';
// dùng observable xử lý bất đồng bộ
import { Observable } from 'rxjs';
import { of } from 'rxjs';
// lấy dữ liệu từ api
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserChatService {
  // đường dẫn đến DB
  private dbURL = "";
  // lấy từ DB về danh sách bạn bè nhắn tin gần nhất
  getUsersChatList(amount: number): Observable<UserChat[]> {
    return of();
  }
  constructor(private http:HttpClient) { }
}
