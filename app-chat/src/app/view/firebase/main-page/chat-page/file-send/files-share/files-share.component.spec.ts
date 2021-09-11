import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesShareComponent } from './files-share.component';

describe('FilesShareComponent', () => {
  let component: FilesShareComponent;
  let fixture: ComponentFixture<FilesShareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilesShareComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
