import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseByIdComponent } from './course-by-id.component';

describe('CourseByIdComponent', () => {
  let component: CourseByIdComponent;
  let fixture: ComponentFixture<CourseByIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseByIdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseByIdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
