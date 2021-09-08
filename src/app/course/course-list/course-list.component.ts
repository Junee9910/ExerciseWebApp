import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseList } from '../../../DTO/model/course/courseList.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  pageTitle = 'Course List';
  errorMessage = '';
  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }
  courses: CourseList[] = [];

  constructor(private service: CourseService, private route: Router) { }

  ngOnInit(): void {
    this.service.getCourses().subscribe({
      next: courses => {
        this.courses = courses;
      },
      error: err => this.errorMessage = err
    });
  }

}
