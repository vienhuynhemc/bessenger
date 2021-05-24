import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import player from 'lottie-web';
// Lottie
import { LottieModule } from 'ngx-lottie';
import { AppRoutingModule } from './app-routing.module';
// Trang index
import { AppComponent } from './app.component';
// Các trang của chat app
import { MainPageComponent } from './view/main-page/main-page.component';
import { ChatPageComponent } from './view/main-page/chat-page/chat-page.component';
import { FriendsPageComponent } from './view/main-page/friends-page/friends-page.component';
import { HomePageComponent } from './view/main-page/home-page/home-page.component';
import { LoginPageComponent } from './view/main-page/login-page/login-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { SettingPageComponent } from './view/main-page/setting-page/setting-page.component';
import { ChatRequestPageComponent } from './view/main-page/chat-request-page/chat-request-page.component';
import { PersonalPageComponent } from './view/main-page/personal-page/personal-page.component';
export function playerFactory() {
  return player;
}

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
    PersonalPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // lottie
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
