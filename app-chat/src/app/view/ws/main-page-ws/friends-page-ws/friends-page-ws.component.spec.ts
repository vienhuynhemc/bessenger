import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FriendsPageWsComponent } from './friends-page-ws.component';

describe('FriendsPageWsComponent', () => {
  let component: FriendsPageWsComponent;
  let fixture: ComponentFixture<FriendsPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FriendsPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FriendsPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
