import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { StudentEdit } from 'src/DTO/model/student/studentEdit.model';
import { StudentList } from '../../../DTO/model/student/studentList.model';

@Component({
  selector: 'app-student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.css']
})
export class StudentEditComponent implements OnInit {

  @ViewChild(NgForm) studentForm: NgForm;
  student: StudentEdit = new StudentEdit();
  pageTitle = 'Student Edit';
  errorMessage: string;
  
  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
  }

  saveStudent(): void {        
    this.studentService.updateStudent(this.student).subscribe({
      next: () => this.router.navigate(['/students']),
      error: err => this.errorMessage = err
    });
  }
}
