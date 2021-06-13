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
import { AngularFireDatabaseModule } from '@angular/fire/database'
import { FormsModule } from '@angular/forms';
import { MessengerComponent } from './view/main-page/chat-page/messenger/messenger.component';
import { FileSendComponent } from './view/main-page/chat-page/file-send/file-send.component';
import { UserOnlineService } from 'src/app/service/user-online/user-online.service';
import { AvatarComponent } from './view/main-page/personal-page/avatar/avatar.component';
import { ProfileComponent } from './view/main-page/personal-page/profile/profile.component';
import { ChangepassComponent } from './view/main-page/personal-page/changepass/changepass.component';
import { AddFriendComponent } from './view/main-page/friends-page/add-friend/add-friend.component';
import { AddGroupComponent } from './view/main-page/friends-page/add-group/add-group.component';
import { GroupsChatListComponent } from './view/main-page/friends-page/groups-chat-list/groups-chat-list.component';
import { RequestAddFriendsListComponent } from './view/main-page/friends-page/request-add-friends-list/request-add-friends-list.component';
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

    AddFriendComponent,
    AddGroupComponent,
    GroupsChatListComponent,
    RequestAddFriendsListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // lottie
    LottieModule.forRoot({ player: playerFactory }),
    // http
    HttpClientModule,
    // firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule

  ],
  providers: [UserChatService, UserOnlineService],
  bootstrap: [AppComponent]
})
export class AppModule { }
