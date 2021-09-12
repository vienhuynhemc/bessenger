import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmojiWsComponent } from './emoji-ws.component';

describe('EmojiWsComponent', () => {
  let component: EmojiWsComponent;
  let fixture: ComponentFixture<EmojiWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmojiWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmojiWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
