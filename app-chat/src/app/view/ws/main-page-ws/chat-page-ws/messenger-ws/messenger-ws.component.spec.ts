import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerWsComponent } from './messenger-ws.component';

describe('MessengerWsComponent', () => {
  let component: MessengerWsComponent;
  let fixture: ComponentFixture<MessengerWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
