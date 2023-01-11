import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadResonanceComponent } from './upload-resonance.component';

describe('UploadResonanceComponent', () => {
  let component: UploadResonanceComponent;
  let fixture: ComponentFixture<UploadResonanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadResonanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadResonanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
