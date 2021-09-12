import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor.service';
import { InstructorList } from 'src/DTO/model/instructor/instructorList.model';
import { InstructorEdit } from '../../../DTO/model/instructor/instructorEdit.model';

@Component({
  selector: 'app-instructor-edit',
  templateUrl: './instructor-edit.component.html',
  styleUrls: ['./instructor-edit.component.css']
})
export class InstructorEditComponent implements OnInit {

  @ViewChild(NgForm) instructorForm: NgForm;
  pageTitle = 'Instructor Edit';
  errorMessage: string;
  instructor: InstructorEdit;
  
  constructor(private service: InstructorService, 
    private router: Router, 
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getInstructor(id);
  }
  getInstructor(id: number): void {
    this.service.getInstructor(id).subscribe({
      next: instructor => this.onInstructorRetrieved(instructor)
    });
  }

  onInstructorRetrieved(instructor: InstructorList): void {
    this.instructor = instructor;

    if (this.instructor) {
      this.pageTitle = `Instructor Edit: ${this.instructor.instructorID}`;
    } else {
      this.pageTitle = 'No instructor found';
    }
  }

  saveInstructor(){
    this.service.updateInstructor(this.instructor).subscribe({
      next: () => this.router.navigate(['/instructors']),
      error: err => this.errorMessage = err
    });
    window.location.reload();
  }
}
