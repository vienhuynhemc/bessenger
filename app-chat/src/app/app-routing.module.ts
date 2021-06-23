import { FileSendComponent } from './view/main-page/chat-page/file-send/file-send.component';
import { MessengerComponent } from './view/main-page/chat-page/messenger/messenger.component';
import { FriendsListComponent } from './view/main-page/chat-page/friends-list/friends-list.component';
import { FpSelectPasswordComponent } from './view/forgot-password/fp-select-password/fp-select-password.component';
import { FpVerifyEmailComponent } from './view/forgot-password/fp-verify-email/fp-verify-email.component';
// Của Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotPasswordComponent } from './view/forgot-password/forgot-password.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
import { ChatPageComponent } from './view/main-page/chat-page/chat-page.component';
import { ChatRequestPageComponent } from './view/main-page/chat-request-page/chat-request-page.component';
import { FriendsPageComponent } from './view/main-page/friends-page/friends-page.component';
import { FriendsComponent } from './view/main-page/friends-page/friends/contacts/friends.component';
import { RequestAddFriendsComponent } from './view/main-page/friends-page/friends/request-add-friends/request-add-friends.component';
import { SendRequsetAddComponent } from './view/main-page/friends-page/friends/send-requset-add/send-requset-add.component';
import { HomePageComponent } from './view/main-page/home-page/home-page.component';
// 2 trang main - 404
import { MainPageComponent } from './view/main-page/main-page.component';
import { PersonalPageComponent } from './view/main-page/personal-page/personal-page.component';
import { SettingPageComponent } from './view/main-page/setting-page/setting-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { RegisterPageComponent } from './view/register-page/register-page.component';
import { SelectAvatarComponent } from './view/register-page/select-avatar/select-avatar.component';
import { SelectSexComponent } from './view/register-page/select-sex/select-sex.component';
import { VerifyEmailComponent } from './view/register-page/verify-email/verify-email.component';

const routes: Routes = [
  { path: '', redirectTo: 'dang-nhap', pathMatch: 'full' },
  { path: 'dang-nhap', component: LoginPageComponent },
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
        ],
      },

      { path: 'thong-tin-ca-nhan', component: PersonalPageComponent },
      { path: 'cai-dat', component: SettingPageComponent },
    ],
  },
  { path: '**', component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
