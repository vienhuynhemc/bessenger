import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSendComponent } from './file-send.component';

describe('FileSendComponent', () => {
  let component: FileSendComponent;
  let fixture: ComponentFixture<FileSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSendComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
