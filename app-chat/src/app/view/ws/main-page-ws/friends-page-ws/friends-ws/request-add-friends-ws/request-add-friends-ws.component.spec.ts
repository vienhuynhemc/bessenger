import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddFriendsWsComponent } from './request-add-friends-ws.component';

describe('RequestAddFriendsWsComponent', () => {
  let component: RequestAddFriendsWsComponent;
  let fixture: ComponentFixture<RequestAddFriendsWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAddFriendsWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAddFriendsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
