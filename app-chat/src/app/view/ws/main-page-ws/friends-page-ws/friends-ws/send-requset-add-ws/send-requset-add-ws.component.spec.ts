import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequsetAddWsComponent } from './send-requset-add-ws.component';

describe('SendRequsetAddWsComponent', () => {
  let component: SendRequsetAddWsComponent;
  let fixture: ComponentFixture<SendRequsetAddWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRequsetAddWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRequsetAddWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
