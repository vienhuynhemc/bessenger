import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasShareComponent } from './medias-share.component';

describe('MediasShareComponent', () => {
  let component: MediasShareComponent;
  let fixture: ComponentFixture<MediasShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediasShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediasShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
