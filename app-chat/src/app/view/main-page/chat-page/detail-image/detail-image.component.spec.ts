import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImageComponent } from './detail-image.component';

describe('DetailImageComponent', () => {
  let component: DetailImageComponent;
  let fixture: ComponentFixture<DetailImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
