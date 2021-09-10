import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VersionService } from './../../service/version/version.service';

@Component({
  selector: 'app-change-version-street',
  templateUrl: './change-version-street.component.html',
  styleUrls: ['./change-version-street.component.scss']
})
export class ChangeVersionStreetComponent implements OnInit {

  constructor(
    public verison_service: VersionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.verison_service.version == 1) {
      this.router.navigate(['/dang-nhap'])
    } else {
      this.router.navigate(['/dang-nhap-ws'])
    }

  }

}
