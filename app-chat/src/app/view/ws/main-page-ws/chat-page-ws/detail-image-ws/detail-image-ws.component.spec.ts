import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailImageWsComponent } from './detail-image-ws.component';

describe('DetailImageWsComponent', () => {
  let component: DetailImageWsComponent;
  let fixture: ComponentFixture<DetailImageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailImageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailImageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
