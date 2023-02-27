import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PathsTableComponent } from './paths-table.component';

describe('PathsTableComponent', () => {
  let component: PathsTableComponent;
  let fixture: ComponentFixture<PathsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PathsTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PathsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
