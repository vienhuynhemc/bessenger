import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageWsComponent } from './home-page-ws.component';

describe('HomePageWsComponent', () => {
  let component: HomePageWsComponent;
  let fixture: ComponentFixture<HomePageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
