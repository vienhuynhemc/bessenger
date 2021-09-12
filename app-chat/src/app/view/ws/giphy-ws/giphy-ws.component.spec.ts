import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiphyWsComponent } from './giphy-ws.component';

describe('GiphyWsComponent', () => {
  let component: GiphyWsComponent;
  let fixture: ComponentFixture<GiphyWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GiphyWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GiphyWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
