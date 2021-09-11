import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsWsComponent } from './friends-ws.component';

describe('FriendsWsComponent', () => {
  let component: FriendsWsComponent;
  let fixture: ComponentFixture<FriendsWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
