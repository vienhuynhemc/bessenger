import { EmojiMessenger } from './../../../../models/chat-page/chat-page-chat-page/content/select-emoji/emoji_messenger';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SelectEmojiService {

  // Danh sách emoji
  public emojis:EmojiMessenger[];

  constructor() {
    this.emojis = [];
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t72/1/32/2764.png","tim"));
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t8e/1/32/1f606.png","cuoi"));
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t7b/1/32/1f62e.png","wow"));
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/tc8/1/32/1f622.png","buon"));
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/tc6/1/32/1f620.png","gian"));
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/tb6/1/32/1f44d.png","like"));
    this.emojis.push(new EmojiMessenger("https://static.xx.fbcdn.net/images/emoji.php/v9/t37/1/32/1f44e.png","dislike"));
   }
}
