import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFoundUserComponent } from './show-found-user.component';

describe('ShowFoundUserComponent', () => {
  let component: ShowFoundUserComponent;
  let fixture: ComponentFixture<ShowFoundUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowFoundUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowFoundUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
