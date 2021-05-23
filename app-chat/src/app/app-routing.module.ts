// Các trang của chat app
import { LoginPageComponent } from './view/login-page/login-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { HomePageComponent } from './view/home-page/home-page.component';
import { FriendsPageComponent } from './view/friends-page/friends-page.component';
import { SettingPageComponent } from './view/setting-page/setting-page.component';
import { ChatPageComponent } from './view/chat-page/chat-page.component';

// Của Angular
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: "", component: HomePageComponent },
  { path: "chat-page", component: ChatPageComponent },
  { path: "setting-page", component: SettingPageComponent },
  { path: "friends-page", component: FriendsPageComponent },
  { path: "home-page", component: HomePageComponent },
  { path: "login-page", component: LoginPageComponent },
  { path: "**", component: NotFoundPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
