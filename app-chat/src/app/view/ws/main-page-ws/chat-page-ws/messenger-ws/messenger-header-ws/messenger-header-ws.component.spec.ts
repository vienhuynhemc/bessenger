import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerHeaderWsComponent } from './messenger-header-ws.component';

describe('MessengerHeaderWsComponent', () => {
  let component: MessengerHeaderWsComponent;
  let fixture: ComponentFixture<MessengerHeaderWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerHeaderWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerHeaderWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
