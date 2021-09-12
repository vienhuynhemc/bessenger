import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StickerWsComponent } from './sticker-ws.component';

describe('StickerWsComponent', () => {
  let component: StickerWsComponent;
  let fixture: ComponentFixture<StickerWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StickerWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StickerWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
