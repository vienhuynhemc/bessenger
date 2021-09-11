import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsListWsComponent } from './friends-list-ws.component';

describe('FriendsListWsComponent', () => {
  let component: FriendsListWsComponent;
  let fixture: ComponentFixture<FriendsListWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsListWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsListWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
