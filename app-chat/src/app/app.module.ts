import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

// Trang index
import { AppComponent } from './app.component';

// Các trang của chat app
import { ChatPageComponent } from './view/chat-page/chat-page.component';
import { FriendsPageComponent } from './view/friends-page/friends-page.component';
import { HomePageComponent } from './view/home-page/home-page.component';
import { SettingPageComponent } from './view/setting-page/setting-page.component';
import { NotFoundPageComponent } from './view/not-found-page/not-found-page.component';
import { LoginPageComponent } from './view/login-page/login-page.component';


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
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
