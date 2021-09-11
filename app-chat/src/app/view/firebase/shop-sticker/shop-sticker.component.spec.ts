import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopStickerComponent } from './shop-sticker.component';

describe('ShopStickerComponent', () => {
  let component: ShopStickerComponent;
  let fixture: ComponentFixture<ShopStickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShopStickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopStickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
