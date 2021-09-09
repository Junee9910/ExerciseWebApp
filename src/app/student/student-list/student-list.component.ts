import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/app/services/student.service';
import { StudentList } from '../../../DTO/model/student/studentList.model';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  pageTitle = 'Student List';
  errorMessage = '';
  students:StudentList[]=[];
  filteredStudents: StudentList[] = [];

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredStudents = this.listFilter ? this.performFilter(this.listFilter) : this.students;
  }

  constructor(private studentService: StudentService,private route: ActivatedRoute) { }

  totalLength:any;
  page:number=1;

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    this.studentService.getStudents().subscribe({
    next: students => {
      this.students = students;
      this.filteredStudents = this.performFilter(this.listFilter);
      this.totalLength=students.length;
    },
    error: err => this.errorMessage = err
  });
  }

  performFilter(filterBy: string): StudentList[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.students.filter((student: StudentList) =>
      student.fullName.toLocaleLowerCase().indexOf(filterBy) !== -1);
  }

  onDelete(id: number){
    if(confirm('Are you sure delete this record?')){
      this.studentService.deleteStudent(id).subscribe();
    }
  }
}
