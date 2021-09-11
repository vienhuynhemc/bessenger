import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessengerFooterComponent } from './messenger-footer.component';

describe('MessengerFooterComponent', () => {
  let component: MessengerFooterComponent;
  let fixture: ComponentFixture<MessengerFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MessengerFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MessengerFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
