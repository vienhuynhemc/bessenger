import { SelectSexWsComponent } from './view/ws/register-page-ws/select-sex-ws/select-sex-ws.component';
import { RegisterPageWsComponent } from './view/ws/register-page-ws/register-page-ws.component';
import { ChangeVersionStreetComponent } from './view/change-version-street/change-version-street.component';
import { LoginPageWsComponent } from './view/ws/login-page-ws/login-page-ws.component';
import { EmojiComponent } from './view/firebase/emoji/emoji.component';
import { FileSendComponent } from './view/firebase/main-page/chat-page/file-send/file-send.component';
import { MessengerComponent } from './view/firebase/main-page/chat-page/messenger/messenger.component';
import { FriendsListComponent } from './view/firebase/main-page/chat-page/friends-list/friends-list.component';
import { FpSelectPasswordComponent } from './view/firebase/forgot-password/fp-select-password/fp-select-password.component';
import { FpVerifyEmailComponent } from './view/firebase/forgot-password/fp-verify-email/fp-verify-email.component';
// Của Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './view/firebase/forgot-password/forgot-password.component';
import { LoginPageComponent } from './view/firebase/login-page/login-page.component';
import { ChatPageComponent } from './view/firebase/main-page/chat-page/chat-page.component';
import { ChatRequestPageComponent } from './view/firebase/main-page/chat-request-page/chat-request-page.component';
import { FriendsPageComponent } from './view/firebase/main-page/friends-page/friends-page.component';
import { FriendsComponent } from './view/firebase/main-page/friends-page/friends/contacts/friends.component';
import { RequestAddFriendsComponent } from './view/firebase/main-page/friends-page/friends/request-add-friends/request-add-friends.component';
import { SendRequsetAddComponent } from './view/firebase/main-page/friends-page/friends/send-requset-add/send-requset-add.component';
import { HomePageComponent } from './view/firebase/main-page/home-page/home-page.component';
// 2 trang main - 404
import { MainPageComponent } from './view/firebase/main-page/main-page.component';
import { PersonalPageComponent } from './view/firebase/main-page/personal-page/personal-page.component';
import { SettingPageComponent } from './view/firebase/main-page/setting-page/setting-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './view/firebase/register-page/register-page.component';
import { SelectAvatarComponent } from './view/firebase/register-page/select-avatar/select-avatar.component';
import { SelectSexComponent } from './view/firebase/register-page/select-sex/select-sex.component';
import { VerifyEmailComponent } from './view/firebase/register-page/verify-email/verify-email.component';
import { AddFriendsComponent } from './view/firebase/main-page/friends-page/friends/add-friends/add-friends.component';
import { OfferFriendsComponent } from './view/firebase/main-page/friends-page/friends/offer-friends/offer-friends.component';
import { ChangePasswordComponent } from './view/firebase/main-page/personal-page/change-password/change-password.component';
import { ChangeProfileComponent } from './view/firebase/main-page/personal-page/change-profile/change-profile.component';
import { VerifyEmailWsComponent } from './view/ws/register-page-ws/verify-email-ws/verify-email-ws.component';
import { SelectAvatarWsComponent } from './view/ws/register-page-ws/select-avatar-ws/select-avatar-ws.component';

const routes: Routes = [
  { path: '', redirectTo: 'dang-nhap', pathMatch: 'full' },
  { path: 'dang-nhap', component: LoginPageComponent },
  { path: 'dang-nhap-ws', component: LoginPageWsComponent },
  { path: 'change-version', component: ChangeVersionStreetComponent },
  {
    path: 'dang-ky',
    component: RegisterPageComponent,
    children: [
      { path: '', redirectTo: 'chon-gioi-tinh', pathMatch: 'full' },
      { path: 'chon-gioi-tinh', component: SelectSexComponent },
      { path: 'chon-hinh-dai-dien', component: SelectAvatarComponent },
      { path: 'xac-nhan-email', component: VerifyEmailComponent },
    ],
  },
  {
    path:'dang-ky-ws',
    component:RegisterPageWsComponent,
    children: [
      { path: '', redirectTo: 'chon-gioi-tinh', pathMatch: 'full' },
      { path: 'chon-gioi-tinh', component: SelectSexWsComponent },
      { path: 'chon-hinh-dai-dien', component: SelectAvatarWsComponent },
      { path: 'xac-nhan-email', component: VerifyEmailWsComponent },
    ],
  },
  {
    path: 'quen-mat-khau',
    component: ForgotPasswordComponent,
    children: [
      { path: '', redirectTo: 'xac-nhan-email', pathMatch: 'full' },
      { path: 'xac-nhan-email', component: FpVerifyEmailComponent },
      { path: 'chon-mat-khau', component: FpSelectPasswordComponent },
    ],
  },
  {
    path: 'bessenger',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
      { path: 'trang-chu', component: HomePageComponent },
      {
        path: 'tin-nhan',
        component: ChatPageComponent,
        children: [
          {
            path: ':id',
            component: FriendsListComponent,
            children: [
              {
                path: '',
                component: MessengerComponent,
                children: [{ path: '', component: FileSendComponent }],
              },
            ],
          },
        ],
      },
      { path: 'tin-nhan-an', component: ChatRequestPageComponent },
      {
        path: 'ban-be',
        component: FriendsPageComponent,
        children: [
          { path: '', redirectTo: 'lien-lac', pathMatch: 'full' },
          { path: 'lien-lac', component: FriendsComponent },
          {
            path: 'lien-lac/:id',
            component: FriendsComponent,
          },

          { path: '', redirectTo: 'loi-moi', pathMatch: 'full' },
          {
            path: 'loi-moi',
            component: RequestAddFriendsComponent,
          },
          {
            path: 'loi-moi/:id',
            component: RequestAddFriendsComponent,
          },
          { path: '', redirectTo: 'da-gui', pathMatch: 'full' },
          { path: 'da-gui', component: SendRequsetAddComponent },
          { path: 'da-gui/:id', component: SendRequsetAddComponent },

          { path: '', redirectTo: 'them-ban', pathMatch: 'full' },
          { path: 'them-ban', component: AddFriendsComponent },
          { path: 'them-ban/:id', component: AddFriendsComponent },

          { path: '', redirectTo: 'de-xuat', pathMatch: 'full' },
          { path: 'de-xuat', component: OfferFriendsComponent },
          { path: 'de-xuat/:id', component: OfferFriendsComponent },
        ],
      },

      {
        path: 'thong-tin-ca-nhan', component: PersonalPageComponent,
        children: [
          { path: 'doi-mat-khau', component: ChangePasswordComponent },
          { path: 'doi-thong-tin', component: ChangeProfileComponent }
        ]
      },
      {
        path: 'cai-dat', component: SettingPageComponent,
        children: [
          { path: '', redirectTo: 'trang-thai-hoat-dong', pathMatch: 'full' },
          { path: 'trang-thai-hoat-dong', component: SettingPageComponent },
          { path: 'thong-bao', component: SettingPageComponent },
          { path: 'ho-tro', component: SettingPageComponent }

        ]
      },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
