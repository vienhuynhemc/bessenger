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
import { MainPageComponent } from './view/firebase/main-page/main-page.component';
import { ChatPageComponent } from './view/firebase/main-page/chat-page/chat-page.component';
import { FriendsPageComponent } from './view/firebase/main-page/friends-page/friends-page.component';
import { HomePageComponent } from './view/firebase/main-page/home-page/home-page.component';
import { LoginPageComponent } from './view/firebase/login-page/login-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { SettingPageComponent } from './view/firebase/main-page/setting-page/setting-page.component';
import { ChatRequestPageComponent } from './view/firebase/main-page/chat-request-page/chat-request-page.component';
import { PersonalPageComponent } from './view/firebase/main-page/personal-page/personal-page.component';
import { FriendsListComponent } from './view/firebase/main-page/chat-page/friends-list/friends-list.component';
// các service để lấy dữ liệu từ đâu đó
import { UserChatService } from 'src/app/service/firebase/user-chat/user-chat.service';
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
import { MessengerComponent } from './view/firebase/main-page/chat-page/messenger/messenger.component';
import { FileSendComponent } from './view/firebase/main-page/chat-page/file-send/file-send.component';
import { UserOnlineService } from 'src/app/service/firebase/user-online/user-online.service';



import { FriendsComponent } from './view/firebase/main-page/friends-page/friends/contacts/friends.component';
import { ProfileFriendComponent } from './view/firebase/main-page/friends-page/friends/profile-friend/profile-friend.component';

import { RegisterPageComponent } from './view/firebase/register-page/register-page.component';
import { SelectSexComponent } from './view/firebase/register-page/select-sex/select-sex.component';
import { SelectAvatarComponent } from './view/firebase/register-page/select-avatar/select-avatar.component';
import { VerifyEmailComponent } from './view/firebase/register-page/verify-email/verify-email.component';
import { ContactsService } from './service/firebase/friends-page/contacts/contacts.service';
import { RequestAddFriendsComponent } from './view/firebase/main-page/friends-page/friends/request-add-friends/request-add-friends.component';
import { SendRequsetAddComponent } from './view/firebase/main-page/friends-page/friends/send-requset-add/send-requset-add.component';
import { ProfileRequestComponent } from './view/firebase/main-page/friends-page/friends/profile-request/profile-request.component';
import { ProfileSendComponent } from './view/firebase/main-page/friends-page/friends/profile-send/profile-send.component';
import { ForgotPasswordComponent } from './view/firebase/forgot-password/forgot-password.component';
import { FpVerifyEmailComponent } from './view/firebase/forgot-password/fp-verify-email/fp-verify-email.component';
import { FpSelectPasswordComponent } from './view/firebase/forgot-password/fp-select-password/fp-select-password.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AddFriendsComponent } from './view/firebase/main-page/friends-page/friends/add-friends/add-friends.component';
import { CreateGroupChatComponent } from './view/firebase/main-page/chat-page/create-group-chat/create-group-chat.component';
import { MessengerHeaderComponent } from './view/firebase/main-page/chat-page/messenger/messenger-header/messenger-header.component';
import { MessengerContentComponent } from './view/firebase/main-page/chat-page/messenger/messenger-content/messenger-content.component';
import { MessengerFooterComponent } from './view/firebase/main-page/chat-page/messenger/messenger-footer/messenger-footer.component';
import { ProfileAddComponent } from './view/firebase/main-page/friends-page/friends/profile-add/profile-add.component';
import { ProfileOfferComponent } from './view/firebase/main-page/friends-page/friends/profile-offer/profile-offer.component';
import { OfferFriendsComponent } from './view/firebase/main-page/friends-page/friends/offer-friends/offer-friends.component';
import { EmojiComponent } from './view/firebase/emoji/emoji.component';
import { GiphyComponent } from './view/firebase/giphy/giphy.component';
import { StickerComponent } from './view/firebase/sticker/sticker.component';
import { ShopStickerComponent } from './view/firebase/shop-sticker/shop-sticker.component';
import { RecordingComponent } from './view/firebase/recording/recording.component';

import { SettingBoxChatComponent } from './view/firebase/main-page/chat-page/file-send/setting-box-chat/setting-box-chat.component';
import { MembersComponent } from './view/firebase/main-page/chat-page/file-send/members/members.component';
import { FilesShareComponent } from './view/firebase/main-page/chat-page/file-send/files-share/files-share.component';
import { MediasShareComponent } from './view/firebase/main-page/chat-page/file-send/medias-share/medias-share.component';
import { MessageRecordingComponent } from './view/firebase/main-page/chat-page/message-recording/message-recording.component';
import { DetailEmojiMessengerComponent } from './view/firebase/main-page/chat-page/detail-emoji-messenger/detail-emoji-messenger.component';
import { DetailImageComponent } from './view/firebase/main-page/chat-page/detail-image/detail-image.component'

import { CallVideoComponent } from './view/firebase/main-page/chat-page/call-video/call-video.component';
import { ChangeProfileComponent } from './view/firebase/main-page/personal-page/change-profile/change-profile.component';
import { ChangePasswordComponent } from './view/firebase/main-page/personal-page/change-password/change-password.component';
import { StatusSettingsComponent } from './view/firebase/main-page/setting-page/status-settings/status-settings.component';
import { MainPageWsComponent } from './view/ws/main-page-ws/main-page-ws.component';
import { ChangeVersionComponent } from './view/change-version/change-version.component';
import { LoginPageWsComponent } from './view/ws/login-page-ws/login-page-ws.component';
import { ChangeVersionStreetComponent } from './view/change-version-street/change-version-street.component';
import { RegisterPageWsComponent } from './view/ws/register-page-ws/register-page-ws.component';
import { VerifyEmailWsComponent } from './view/ws/register-page-ws/verify-email-ws/verify-email-ws.component';
import { SelectSexWsComponent } from './view/ws/register-page-ws/select-sex-ws/select-sex-ws.component';
import { SelectAvatarWsComponent } from './view/ws/register-page-ws/select-avatar-ws/select-avatar-ws.component';
import { ForgotPasswordWsComponent } from './view/ws/forgot-password-ws/forgot-password-ws.component';
import { FpSelectPasswordWsComponent } from './view/ws/forgot-password-ws/fp-select-password-ws/fp-select-password-ws.component';
import { FpVerifyEmailWsComponent } from './view/ws/forgot-password-ws/fp-verify-email-ws/fp-verify-email-ws.component';
import { HomePageWsComponent } from './view/ws/main-page-ws/home-page-ws/home-page-ws.component';
import { ChatPageWsComponent } from './view/ws/main-page-ws/chat-page-ws/chat-page-ws.component';
import { ChatRequestPageWsComponent } from './view/ws/main-page-ws/chat-request-page-ws/chat-request-page-ws.component';
import { FriendsPageWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-page-ws.component';
import { PersonalPageWsComponent } from './view/ws/main-page-ws/personal-page-ws/personal-page-ws.component';
import { SettingPageWsComponent } from './view/ws/main-page-ws/setting-page-ws/setting-page-ws.component';
import { FriendsWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/contacts-ws/friends-ws.component';
import { FriendsListWsComponent } from './view/ws/main-page-ws/chat-page-ws/friends-list-ws/friends-list-ws.component';
import { MessengerWsComponent } from './view/ws/main-page-ws/chat-page-ws/messenger-ws/messenger-ws.component';
import { FileSendWsComponent } from './view/ws/main-page-ws/chat-page-ws/file-send-ws/file-send-ws.component';
import { RequestAddFriendsWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/request-add-friends-ws/request-add-friends-ws.component';
import { SendRequsetAddWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/send-requset-add-ws/send-requset-add-ws.component';
import { AddFriendsWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/add-friends-ws/add-friends-ws.component';
import { OfferFriendsWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/offer-friends-ws/offer-friends-ws.component';
import { ChangePasswordWsComponent } from './view/ws/main-page-ws/personal-page-ws/change-password-ws/change-password-ws.component';
import { ChangeProfileWsComponent } from './view/ws/main-page-ws/personal-page-ws/change-profile-ws/change-profile-ws.component';
import { ProfileFriendWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/profile-friend-ws/profile-friend-ws.component';
import { ProfileRequestWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/profile-request-ws/profile-request-ws.component';
import { ProfileSendWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/profile-send-ws/profile-send-ws.component';
import { ProfileOfferWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/profile-offer-ws/profile-offer-ws.component';
import { ProfileAddWsComponent } from './view/ws/main-page-ws/friends-page-ws/friends-ws/profile-add-ws/profile-add-ws.component';
import { MessengerContentWsComponent } from './view/ws/main-page-ws/chat-page-ws/messenger-ws/messenger-content-ws/messenger-content-ws.component';
import { MessengerFooterWsComponent } from './view/ws/main-page-ws/chat-page-ws/messenger-ws/messenger-footer-ws/messenger-footer-ws.component';
import { MessengerHeaderWsComponent } from './view/ws/main-page-ws/chat-page-ws/messenger-ws/messenger-header-ws/messenger-header-ws.component';
import { FilesShareWsComponent } from './view/ws/main-page-ws/chat-page-ws/file-send-ws/files-share-ws/files-share-ws.component';
import { MediasShareWsComponent } from './view/ws/main-page-ws/chat-page-ws/file-send-ws/medias-share-ws/medias-share-ws.component';
import { MembersWsComponent } from './view/ws/main-page-ws/chat-page-ws/file-send-ws/members-ws/members-ws.component';
import { SettingBoxChatWsComponent } from './view/ws/main-page-ws/chat-page-ws/file-send-ws/setting-box-chat-ws/setting-box-chat-ws.component';
import { DetailEmojiMessengerWsComponent } from './view/ws/main-page-ws/chat-page-ws/detail-emoji-messenger-ws/detail-emoji-messenger-ws.component';
import { DetailImageWsComponent } from './view/ws/main-page-ws/chat-page-ws/detail-image-ws/detail-image-ws.component';
import { MessengeRecordingWsComponent } from './view/ws/main-page-ws/chat-page-ws/messenge-recording-ws/messenge-recording-ws.component';
import { StickerWsComponent } from './view/ws/sticker-ws/sticker-ws.component';
import { ShopStickerWsComponent } from './view/ws/shop-sticker-ws/shop-sticker-ws.component';
import { RecordingWsComponent } from './view/ws/recording-ws/recording-ws.component';
import { GiphyWsComponent } from './view/ws/giphy-ws/giphy-ws.component';
import { EmojiWsComponent } from './view/ws/emoji-ws/emoji-ws.component';
import { StatusSettingsWsComponent } from './view/ws/main-page-ws/setting-page-ws/status-settings-ws/status-settings-ws.component';
import { CallVideoWsComponent } from './view/ws/main-page-ws/chat-page-ws/call-video-ws/call-video-ws.component';
import { CreateGroupChatWsComponent } from './view/ws/main-page-ws/chat-page-ws/create-group-chat-ws/create-group-chat-ws.component'


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
    StickerComponent,
    ShopStickerComponent,
    RecordingComponent,


    ShopStickerComponent, 
    SettingBoxChatComponent,
    MembersComponent, 
    FilesShareComponent,
    MediasShareComponent,
    MessageRecordingComponent, 
    DetailEmojiMessengerComponent,
    DetailImageComponent, 
    CallVideoComponent,
    ChangeProfileComponent,
    ChangePasswordComponent, 
    StatusSettingsComponent,
    MainPageWsComponent,
    ChangeVersionComponent,
    LoginPageWsComponent, 
    ChangeVersionStreetComponent, 
    RegisterPageWsComponent,
    VerifyEmailWsComponent,
    SelectSexWsComponent,
    SelectAvatarWsComponent,
    ForgotPasswordWsComponent,
    FpSelectPasswordWsComponent,
    FpVerifyEmailWsComponent,
    HomePageWsComponent, 
    ChatPageWsComponent,
    ChatRequestPageWsComponent, 
    FriendsPageWsComponent, 
    PersonalPageWsComponent, 
    SettingPageWsComponent,
    FriendsWsComponent,
    FriendsListWsComponent, 
    MessengerWsComponent,
    FileSendWsComponent,
    RequestAddFriendsWsComponent, 
    SendRequsetAddWsComponent, 
    AddFriendsWsComponent,
    OfferFriendsWsComponent,
    ChangePasswordWsComponent,
    ChangeProfileWsComponent,
    ProfileFriendWsComponent,
    ProfileRequestWsComponent,
    ProfileSendWsComponent,
    ProfileOfferWsComponent,
    ProfileAddWsComponent,
    MessengerContentWsComponent,
    MessengerFooterWsComponent,
    MessengerHeaderWsComponent,
    FilesShareWsComponent,
    MediasShareWsComponent,
    MembersWsComponent,
    SettingBoxChatWsComponent,
    DetailEmojiMessengerWsComponent,
    DetailImageWsComponent,
    MessengeRecordingWsComponent,
    StickerWsComponent,
    ShopStickerWsComponent,
    RecordingWsComponent,
    GiphyWsComponent,
    EmojiWsComponent,
    StatusSettingsWsComponent,
    CallVideoWsComponent,
    CreateGroupChatWsComponent
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
