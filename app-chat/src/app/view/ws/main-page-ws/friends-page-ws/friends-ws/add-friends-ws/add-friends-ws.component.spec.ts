import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFriendsWsComponent } from './add-friends-ws.component';

describe('AddFriendsWsComponent', () => {
  let component: AddFriendsWsComponent;
  let fixture: ComponentFixture<AddFriendsWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFriendsWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFriendsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
