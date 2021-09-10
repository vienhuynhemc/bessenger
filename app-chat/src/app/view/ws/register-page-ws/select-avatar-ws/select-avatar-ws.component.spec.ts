import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAvatarWsComponent } from './select-avatar-ws.component';

describe('SelectAvatarWsComponent', () => {
  let component: SelectAvatarWsComponent;
  let fixture: ComponentFixture<SelectAvatarWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAvatarWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAvatarWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
