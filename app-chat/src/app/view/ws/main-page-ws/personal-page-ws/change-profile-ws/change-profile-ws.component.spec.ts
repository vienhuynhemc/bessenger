import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfileWsComponent } from './change-profile-ws.component';

describe('ChangeProfileWsComponent', () => {
  let component: ChangeProfileWsComponent;
  let fixture: ComponentFixture<ChangeProfileWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProfileWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfileWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
