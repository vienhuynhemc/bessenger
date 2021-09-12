import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerFooterWsComponent } from './messenger-footer-ws.component';

describe('MessengerFooterWsComponent', () => {
  let component: MessengerFooterWsComponent;
  let fixture: ComponentFixture<MessengerFooterWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerFooterWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerFooterWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
