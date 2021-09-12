import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStickerWsComponent } from './shop-sticker-ws.component';

describe('ShopStickerWsComponent', () => {
  let component: ShopStickerWsComponent;
  let fixture: ComponentFixture<ShopStickerWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopStickerWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopStickerWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
