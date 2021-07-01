import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Lottie
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
export function playerFactory() {
  return player;
}
// Trang index
import { AppComponent } from './app.component';
// Các trang của chat app
import { MainPageComponent } from './view/main-page/main-page.component';
import { ChatPageComponent } from './view/main-page/chat-page/chat-page.component';
import { FriendsPageComponent } from './view/main-page/friends-page/friends-page.component';
import { HomePageComponent } from './view/main-page/home-page/home-page.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { SettingPageComponent } from './view/main-page/setting-page/setting-page.component';
import { ChatRequestPageComponent } from './view/main-page/chat-request-page/chat-request-page.component';
import { PersonalPageComponent } from './view/main-page/personal-page/personal-page.component';
import { FriendsListComponent } from './view/main-page/chat-page/friends-list/friends-list.component';
// các service để lấy dữ liệu từ đâu đó
import { UserChatService } from 'src/app/service/user-chat/user-chat.service';
// thư viện get request
import { HttpClientModule } from '@angular/common/http';
// tooltip
import { MatTooltipModule } from '@angular/material/tooltip';
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { MessengerComponent } from './view/main-page/chat-page/messenger/messenger.component';
import { FileSendComponent } from './view/main-page/chat-page/file-send/file-send.component';
import { UserOnlineService } from 'src/app/service/user-online/user-online.service';



import { FriendsComponent } from './view/main-page/friends-page/friends/contacts/friends.component';
import { ProfileFriendComponent } from './view/main-page/friends-page/friends/profile-friend/profile-friend.component';

import { RegisterPageComponent } from './view/register-page/register-page.component';
import { SelectSexComponent } from './view/register-page/select-sex/select-sex.component';
import { SelectAvatarComponent } from './view/register-page/select-avatar/select-avatar.component';
import { VerifyEmailComponent } from './view/register-page/verify-email/verify-email.component';
import { ContactsService } from './service/friends-page/contacts/contacts.service';
import { RequestAddFriendsComponent } from './view/main-page/friends-page/friends/request-add-friends/request-add-friends.component';
import { SendRequsetAddComponent } from './view/main-page/friends-page/friends/send-requset-add/send-requset-add.component';
import { ProfileRequestComponent } from './view/main-page/friends-page/friends/profile-request/profile-request.component';
import { ProfileSendComponent } from './view/main-page/friends-page/friends/profile-send/profile-send.component';
import { ForgotPasswordComponent } from './view/forgot-password/forgot-password.component';
import { FpVerifyEmailComponent } from './view/forgot-password/fp-verify-email/fp-verify-email.component';
import { FpSelectPasswordComponent } from './view/forgot-password/fp-select-password/fp-select-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddFriendsComponent } from './view/main-page/friends-page/friends/add-friends/add-friends.component';
import { CreateGroupChatComponent } from './view/main-page/chat-page/create-group-chat/create-group-chat.component';
import { MessengerHeaderComponent } from './view/main-page/chat-page/messenger/messenger-header/messenger-header.component';
import { MessengerContentComponent } from './view/main-page/chat-page/messenger/messenger-content/messenger-content.component';
import { MessengerFooterComponent } from './view/main-page/chat-page/messenger/messenger-footer/messenger-footer.component';
import { ProfileAddComponent } from './view/main-page/friends-page/friends/profile-add/profile-add.component';
import { ProfileOfferComponent } from './view/main-page/friends-page/friends/profile-offer/profile-offer.component';
import { OfferFriendsComponent } from './view/main-page/friends-page/friends/offer-friends/offer-friends.component';
import { EmojiComponent } from './view/emoji/emoji.component';
import { GiphyComponent } from './view/giphy/giphy.component';


@NgModule({
  declarations: [
    // Trang index
    AppComponent,
    // Các trang của chat app
    ChatPageComponent,
    HomePageComponent,
    SettingPageComponent,
    FriendsPageComponent,
    NotFoundPageComponent,
    LoginPageComponent,
    MainPageComponent,
    ChatRequestPageComponent,
    PersonalPageComponent,
    FriendsListComponent,
    MessengerComponent,
    FileSendComponent,
 
    FriendsComponent,
    ProfileFriendComponent,

    RegisterPageComponent,
    SelectSexComponent,
    SelectAvatarComponent,
    VerifyEmailComponent,
    RequestAddFriendsComponent,
    SendRequsetAddComponent,
    ProfileRequestComponent,
    ProfileSendComponent,
    ForgotPasswordComponent,
    FpVerifyEmailComponent,
    FpSelectPasswordComponent,
    AddFriendsComponent,
    CreateGroupChatComponent,
    MessengerHeaderComponent,
    MessengerContentComponent,
    MessengerFooterComponent,
    ProfileAddComponent,

    ProfileOfferComponent,
    OfferFriendsComponent,
    EmojiComponent,
    GiphyComponent,


  ],
  imports: [
    BrowserModule,
    // http
    HttpClientModule,
    AppRoutingModule,
    // lottie
    LottieModule.forRoot({ player: playerFactory }),
    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    FormsModule,
    BrowserAnimationsModule,
    // tooltip
    MatTooltipModule,
  ],
  providers: [
    UserChatService,
    UserOnlineService,
    ContactsService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
