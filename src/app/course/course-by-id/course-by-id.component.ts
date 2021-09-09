import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/course.service';
import { CourseList } from '../../../DTO/model/course/courseList.model';
import { ActivatedRoute } from '@angular/router';
import { CourseById } from '../../../DTO/model/course/courseById.model';

@Component({
  selector: 'app-course-by-id',
  templateUrl: './course-by-id.component.html',
  styleUrls: ['./course-by-id.component.css']
})
export class CourseByIdComponent implements OnInit {

  pageTitle = 'Course Detail';
  course: CourseById;

  constructor(private service: CourseService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCourse(id);
  }
  getCourse(id: number): void {
    this.service.getcourse(id).subscribe({
      next: course => this.onStudentRetrieved(course)
    });
  }

  onStudentRetrieved(course: CourseById): void {
    this.course = course;

    if (this.course) {
      this.pageTitle = `Course Detail: ${this.course.courseID}`;
    } else {
      this.pageTitle = 'No student found';
    }
  }
}
