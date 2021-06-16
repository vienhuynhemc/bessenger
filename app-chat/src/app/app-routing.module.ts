import { SelectAvatarComponent } from './view/register-page/select-avatar/select-avatar.component';
import { VerifyEmailComponent } from './view/register-page/verify-email/verify-email.component';
import { SelectSexComponent } from './view/register-page/select-sex/select-sex.component';
import { RegisterPageComponent } from './view/register-page/register-page.component';
import { SettingPageComponent } from './view/main-page/setting-page/setting-page.component';
import { ChatRequestPageComponent } from './view/main-page/chat-request-page/chat-request-page.component';
import { FriendsPageComponent } from './view/main-page/friends-page/friends-page.component';
import { PersonalPageComponent } from './view/main-page/personal-page/personal-page.component';
import { ChatPageComponent } from './view/main-page/chat-page/chat-page.component';
import { HomePageComponent } from './view/main-page/home-page/home-page.component';
import { LoginPageComponent } from './view/login-page/login-page.component';
// 2 trang main - 404
import { MainPageComponent } from './view/main-page/main-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
// Của Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RequestAddFriendsComponent } from './view/main-page/friends-page/friends/request-add-friends/request-add-friends.component';
import { SendRequsetAddComponent } from './view/main-page/friends-page/friends/send-requset-add/send-requset-add.component';
import { FriendsComponent } from './view/main-page/friends-page/friends/contacts/friends.component';
import { ProfileComponent } from './view/main-page/personal-page/profile/profile.component';
import { ProfileRequestComponent } from './view/main-page/friends-page/friends/profile-request/profile-request.component';
import { ProfileSendComponent } from './view/main-page/friends-page/friends/profile-send/profile-send.component';
import { ProfileFriendComponent } from './view/main-page/friends-page/friends/profile-friend/profile-friend.component';

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
    path: 'bessenger',
    component: MainPageComponent,
    children: [
      { path: '', redirectTo: 'trang-chu', pathMatch: 'full' },
      { path: 'trang-chu', component: HomePageComponent },
      { path: 'tin-nhan', component: ChatPageComponent },
      { path: 'tin-nhan-an', component: ChatRequestPageComponent },
      {
        path: 'ban-be',
        component: FriendsPageComponent,
        children: [
          { path: '', redirectTo: 'lien-lac', pathMatch: 'full' },
          { path: 'lien-lac', component: FriendsComponent},
          { path: 'loi-moi', component: RequestAddFriendsComponent},
          { path: 'da-gui', component: SendRequsetAddComponent}],
          
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
export class AppRoutingModule {}
