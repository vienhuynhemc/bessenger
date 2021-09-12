import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersWsComponent } from './members-ws.component';

describe('MembersWsComponent', () => {
  let component: MembersWsComponent;
  let fixture: ComponentFixture<MembersWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
