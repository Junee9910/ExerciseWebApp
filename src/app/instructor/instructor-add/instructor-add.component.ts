import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor.service';
import { InstructorCreate } from 'src/DTO/model/instructor/instructorCreate.model';

@Component({
  selector: 'app-instructor-add',
  templateUrl: './instructor-add.component.html',
  styleUrls: ['./instructor-add.component.css']
})
export class InstructorAddComponent implements OnInit {

  @ViewChild(NgForm) instructorForm: NgForm;
  pageTitle = 'Instructor Add';
  errorMessage: string;
  instructor: InstructorCreate = new InstructorCreate();
  
  constructor(public service: InstructorService, private router: Router) { }

  ngOnInit(): void {
  }

  saveInstructor(){
    this.service.createInstructor(this.instructor).subscribe({
      next: () => this.router.navigate(['/instructors']),
      error: err => this.errorMessage = err
    });
  }
}
