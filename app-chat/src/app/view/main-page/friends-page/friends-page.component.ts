import {
  Component,

  OnInit,

} from '@angular/core';
import { MainPageService } from 'src/app/service/main-page/main-page.service';


@Component({
  selector: 'app-friends-page',
  templateUrl: './friends-page.component.html',
  styleUrls: ['./friends-page.component.scss'],
})
export class FriendsPageComponent implements OnInit {
  constructor(private main_page_service: MainPageService) {}
  ngOnInit(): void {
    setTimeout(() => {
      this.main_page_service.reset();
      this.main_page_service.selectFriendsPage();
    }, 0);
  }
}
