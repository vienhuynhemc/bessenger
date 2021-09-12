import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmojiMessengerWsComponent } from './detail-emoji-messenger-ws.component';

describe('DetailEmojiMessengerWsComponent', () => {
  let component: DetailEmojiMessengerWsComponent;
  let fixture: ComponentFixture<DetailEmojiMessengerWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEmojiMessengerWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmojiMessengerWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
