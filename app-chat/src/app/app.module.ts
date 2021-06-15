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
// firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';
import { MessengerComponent } from './view/main-page/chat-page/messenger/messenger.component';
import { FileSendComponent } from './view/main-page/chat-page/file-send/file-send.component';
import { UserOnlineService } from 'src/app/service/user-online/user-online.service';
import { AvatarComponent } from './view/main-page/personal-page/avatar/avatar.component';
import { ProfileComponent } from './view/main-page/personal-page/profile/profile.component';
import { ChangepassComponent } from './view/main-page/personal-page/changepass/changepass.component';

import { FriendsPageService } from './service/friends-page/main/friends-page.service';
import { RequestAddFriendService } from './service/friends-page/request-add/request-add-friend.service';
import { AddGroupService } from './service/friends-page/add-group/add-group.service';
import { AddFriendService } from './service/friends-page/add-friend/add-friend.service';
import { FriendsListService } from './service/chat-page/friends-list/friends-list.service';
import { RegisterPageComponent } from './view/register-page/register-page.component';
import { SelectSexComponent } from './view/register-page/select-sex/select-sex.component';
import { SelectAvatarComponent } from './view/register-page/select-avatar/select-avatar.component';
import { VerifyEmailComponent } from './view/register-page/verify-email/verify-email.component';
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
    AvatarComponent,
    ProfileComponent,
    ChangepassComponent,
    RegisterPageComponent,
    SelectSexComponent,
    SelectAvatarComponent,
    VerifyEmailComponent,


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
  ],
  providers: [
    UserChatService,
    UserOnlineService,
    FriendsPageService,
    RequestAddFriendService,
    AddGroupService,
    AddFriendService,
    FriendsListService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
