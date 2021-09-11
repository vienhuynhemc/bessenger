import { Injectable } from '@angular/core';
import { ChatPageBanBe } from 'src/app/models/firebase/chat-page/chat-page-friends-page/chat_page_ban_be';

@Injectable({
  providedIn: 'root'
})
export class ChatPageFriendsServiceWsService {

  // Danh sách bạn bè 
  public ban_bes: ChatPageBanBe[];

  constructor() { }
}
