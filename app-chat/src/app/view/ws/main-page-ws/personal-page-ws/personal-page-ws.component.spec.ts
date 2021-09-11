import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalPageWsComponent } from './personal-page-ws.component';

describe('PersonalPageWsComponent', () => {
  let component: PersonalPageWsComponent;
  let fixture: ComponentFixture<PersonalPageWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalPageWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalPageWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
