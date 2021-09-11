import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSendWsComponent } from './file-send-ws.component';

describe('FileSendWsComponent', () => {
  let component: FileSendWsComponent;
  let fixture: ComponentFixture<FileSendWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSendWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FileSendWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
