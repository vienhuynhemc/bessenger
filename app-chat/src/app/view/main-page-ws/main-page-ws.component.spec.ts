import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPageWsComponent } from './main-page-ws.component';

describe('MainPageWsComponent', () => {
  let component: MainPageWsComponent;
  let fixture: ComponentFixture<MainPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
