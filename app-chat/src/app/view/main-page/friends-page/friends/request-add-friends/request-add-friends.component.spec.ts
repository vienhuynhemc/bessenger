import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddFriendsComponent } from './request-add-friends.component';

describe('RequestAddFriendsComponent', () => {
  let component: RequestAddFriendsComponent;
  let fixture: ComponentFixture<RequestAddFriendsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAddFriendsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAddFriendsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
