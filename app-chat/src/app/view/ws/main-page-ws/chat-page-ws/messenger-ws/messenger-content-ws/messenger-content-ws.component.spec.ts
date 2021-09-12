import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerContentWsComponent } from './messenger-content-ws.component';

describe('MessengerContentWsComponent', () => {
  let component: MessengerContentWsComponent;
  let fixture: ComponentFixture<MessengerContentWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerContentWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerContentWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
