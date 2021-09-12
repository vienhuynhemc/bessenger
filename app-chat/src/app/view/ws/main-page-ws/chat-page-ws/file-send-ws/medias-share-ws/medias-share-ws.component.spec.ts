import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediasShareWsComponent } from './medias-share-ws.component';

describe('MediasShareWsComponent', () => {
  let component: MediasShareWsComponent;
  let fixture: ComponentFixture<MediasShareWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MediasShareWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MediasShareWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
