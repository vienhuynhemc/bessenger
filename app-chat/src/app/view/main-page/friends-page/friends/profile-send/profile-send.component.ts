import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FriendInfor } from 'src/app/models/friends-page/friend_Infor';
import { SendInfor } from 'src/app/models/friends-page/send_infor';
import { ContactsService } from 'src/app/service/friends-page/contacts/contacts.service';
import { SendAddFriendService } from 'src/app/service/friends-page/send-add/send-add-friend.service';

@Component({
  selector: 'app-profile-send',
  templateUrl: './profile-send.component.html',
  styleUrls: ['./profile-send.component.scss']
})
export class ProfileSendComponent implements OnInit, OnDestroy {
  friendInfor: SendInfor ;
  private valueFromChildSubscription: Subscription;
  constructor(
    private contactsService: ContactsService,
    private sendAddService: SendAddFriendService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFriendFromFriendsSend();
   
  }
   // chuyển đến trang tin nhắn
   onClickMessage(id: string) {
   
  }

  ngOnDestroy(): void {
    this.valueFromChildSubscription.unsubscribe();
  }

   // đồng bộ dữ liệu với sends list
   getFriendFromFriendsSend() {
    this.friendInfor = new SendInfor();
    this.friendInfor.id = 1;
    this.valueFromChildSubscription =
      this.contactsService.friendInforService.subscribe((id) => {
        // kiểm tra 404
        if (id == null) {
          // id == 1 là đường dẫn không có id
          this.friendInfor.id = 1;
        } else {
          this.sendAddService.getInforSend(id).once('value', (data) => {
            if (data.val() != null) {
              this.friendInfor.id = id;
              this.friendInfor.img = data.val().link_hinh;
              this.friendInfor.name = data.val().ten;
            } else {
              this.router.navigate(['/**'])
              this.contactsService.setFriendInforService(null);
            }
           
          });
        }
      
      });
  }

}
