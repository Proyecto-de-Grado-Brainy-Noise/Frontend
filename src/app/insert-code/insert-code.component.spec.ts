import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertCodeComponent } from './insert-code.component';

describe('InsertCodeComponent', () => {
  let component: InsertCodeComponent;
  let fixture: ComponentFixture<InsertCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InsertCodeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsertCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
