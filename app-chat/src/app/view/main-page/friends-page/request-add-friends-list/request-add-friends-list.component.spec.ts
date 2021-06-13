import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestAddFriendsListComponent } from './request-add-friends-list.component';

describe('RequestAddFriendsListComponent', () => {
  let component: RequestAddFriendsListComponent;
  let fixture: ComponentFixture<RequestAddFriendsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestAddFriendsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestAddFriendsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
