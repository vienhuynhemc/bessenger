import { LoginService } from './../../service/login/login.service';
import { Component, ComponentFactoryResolver, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ChatPageComponent } from './chat-page/chat-page.component';
import { ChatRequestPageComponent } from './chat-request-page/chat-request-page.component';
import { FriendsPageComponent } from './friends-page/friends-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PersonalPageComponent } from './personal-page/personal-page.component';
import { SettingPageComponent } from './setting-page/setting-page.component';


@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {
  // Container
  @ViewChild('container', { read: ViewContainerRef }) container: ViewContainerRef | undefined;
  @ViewChild('chat_page') chat_page: ElementRef | undefined;
  @ViewChild('personal_page') personal_page: ElementRef | undefined;
  @ViewChild('home_page') home_page: ElementRef | undefined;
  @ViewChild('chat_request_page') chat_request_page: ElementRef | undefined;
  @ViewChild('setting_page') setting_page: ElementRef | undefined;
  @ViewChild('friends_page') friends_page: ElementRef | undefined;

  // Danh sách các component của container
  components: ComponentRef<unknown>[] = [];
  // Danh sách gán tên component để dùng bên HTML
  chatPageComponent = ChatPageComponent;
  homePageComponent = HomePageComponent;
  personalPageComponent = PersonalPageComponent;
  friendsPageComponent = FriendsPageComponent;
  chatRequestPageComponent = ChatRequestPageComponent;
  settingPageComponent = SettingPageComponent;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private login_service: LoginService) {
  }

  // Tạo sẵn chat-page  || AE code sửa lại trang tương ứng
  ngAfterViewInit(): void {
    if (this.chat_page != undefined) {
      let chat_page_html = this.chat_page.nativeElement;
      this.moveToPage(chat_page_html, this.chatPageComponent);
    }
  }

  ngOnInit(): void {
    if (!this.login_service.isLoginSuccess()) {
      this.router.navigate(['/dang-nhap']);
    }
  }

  // Đăng xuất
  logOut(): void {
    this.login_service.logOut();
    this.router.navigate(['/dang-nhap']);
  }

  // Di chuyển trang
  moveToPage(elementSelect: any, name_component: any): void {
    this.removeSelectedInMenuAndSelectThis(elementSelect);
    //Remove component
    this.removeNowComponent();
    // Add new Component
    if (this.container != undefined) {
      let componentFactory = this.componentFactoryResolver.resolveComponentFactory(name_component);
      let component = this.container.createComponent(componentFactory);
      component.changeDetectorRef.detectChanges();
      this.components.push(component);
    }
  }

  removeNowComponent() {
    if (this.container != undefined) {
      if (this.components.length > 0) {
        this.container.remove(0);
        this.components.splice(0, 1);
      }
    }
  }

  removeSelectedInMenuAndSelectThis(elementSelect: HTMLElement): void {
    // Remove selected
    let containerLeftMenu = document.getElementById("container-left-menu");
    if (containerLeftMenu != null) {
      let childrenContainerLeftMenu = containerLeftMenu.children;
      for (let i = 0; i < childrenContainerLeftMenu.length; i++) {
        if (childrenContainerLeftMenu[i].classList.contains("container-left-menu-icon-selected")) {
          childrenContainerLeftMenu[i].classList.remove("container-left-menu-icon-selected");
          break;
        }
      }
    }
    // Select
    if (elementSelect != null) {
      elementSelect.classList.add("container-left-menu-icon-selected");
    }
  }

}
