import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { StudentList } from '../../../DTO/model/student/studentList.model';
import { StudentEnrollment } from '../../../DTO/model/student/studentEnrollmentCourseById.model';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.css']
})
export class StudentDetailComponent implements OnInit {

  pageTitle = 'Student Detail';
  student: StudentEnrollment;

  constructor(private service: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getStudent(id);
  }

  getStudent(id: number): void {
    this.service.getStudent(id).subscribe({
      next: student => this.onStudentRetrieved(student)
    });
  }

  onStudentRetrieved(student: StudentEnrollment): void {
    this.student = student;

    if (this.student) {
      this.pageTitle = `Student Detail: ${this.student.studentID}`;
    } else {
      this.pageTitle = 'No student found';
    }
  }
}
