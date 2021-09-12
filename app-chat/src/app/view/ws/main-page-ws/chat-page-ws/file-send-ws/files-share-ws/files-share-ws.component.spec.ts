import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesShareWsComponent } from './files-share-ws.component';

describe('FilesShareWsComponent', () => {
  let component: FilesShareWsComponent;
  let fixture: ComponentFixture<FilesShareWsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesShareWsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesShareWsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
