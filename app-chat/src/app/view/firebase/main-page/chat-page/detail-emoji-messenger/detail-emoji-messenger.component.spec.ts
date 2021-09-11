import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailEmojiMessengerComponent } from './detail-emoji-messenger.component';

describe('DetailEmojiMessengerComponent', () => {
  let component: DetailEmojiMessengerComponent;
  let fixture: ComponentFixture<DetailEmojiMessengerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailEmojiMessengerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailEmojiMessengerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
