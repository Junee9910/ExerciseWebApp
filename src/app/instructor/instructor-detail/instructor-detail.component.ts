import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InstructorService } from 'src/app/services/instructor.service';
import { InstructorList } from '../../../DTO/model/instructor/instructorList.model';

@Component({
  selector: 'app-instructor-detail',
  templateUrl: './instructor-detail.component.html',
  styleUrls: ['./instructor-detail.component.css']
})
export class InstructorDetailComponent implements OnInit {

  pageTitle = 'Instructor Detail';
  instructor: InstructorList;

  constructor(private service: InstructorService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.getInstructor(id);
  }

  getInstructor(id: number): void {
    this.service.getInstructor(id).subscribe({
      next: student => this.onInstructorRetrieved(student)
    });
  }

  onInstructorRetrieved(instructor: InstructorList): void {
    this.instructor = instructor;

    if (this.instructor) {
      this.pageTitle = `Instructor Detail: ${this.instructor.fullName}`;
    } else {
      this.pageTitle = 'No instructor found';
    }
  }
}
