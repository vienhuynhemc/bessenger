import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerContentComponent } from './messenger-content.component';

describe('MessengerContentComponent', () => {
  let component: MessengerContentComponent;
  let fixture: ComponentFixture<MessengerContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
