import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRequsetAddComponent } from './send-requset-add.component';

describe('SendRequsetAddComponent', () => {
  let component: SendRequsetAddComponent;
  let fixture: ComponentFixture<SendRequsetAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendRequsetAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendRequsetAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
