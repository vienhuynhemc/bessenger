import { Injectable } from '@angular/core';
import { ChatPageFriendsObjectLeft } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_friends_object_left';

@Injectable({
  providedIn: 'root'
})
export class ChatPageFriendsLeftServiceWsService {

  // Danh sách các box chat để hiển thị ra
  public allBoxData: ChatPageFriendsObjectLeft[];

  constructor() { }
}
