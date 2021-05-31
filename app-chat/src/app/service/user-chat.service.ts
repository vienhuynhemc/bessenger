// lấy dữ liệu từ api
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// dùng observable xử lý bất đồng bộ
import { Observable, of } from 'rxjs';
import { UserChat } from 'src/app/models/user_chat';
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
  constructor(private http: HttpClient) { }
}
