import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InstructorList } from '../../../DTO/model/instructor/instructorList.model';
import { InstructorService } from '../../services/instructor.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  pageTitle = 'Instructor List';
  errorMessage = '';

  instructors: InstructorList[] = []

  constructor(private instructorService: InstructorService, private route: Router) { }

  ngOnInit(): void {
    this.instructorService.getInstructors().subscribe({
      next: instructors => {
        this.instructors = instructors;
      },
      error: err => this.errorMessage = err
    });
  }

  onDelete(id: number){
    if(confirm('Are you sure delete this record?')){
      this.instructorService.deleteInstructor(id).subscribe();
    }
  }
}
