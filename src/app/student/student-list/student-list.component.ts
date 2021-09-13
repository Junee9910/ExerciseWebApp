import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { StudentService } from 'src/app/services/student.service';
import { Filter } from 'src/DTO/model/filter.model';
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
  totalLength:any;
  left:number=0;

  students$!: Observable<StudentList[]>;
  page:number=1;
  pageSize:number=10;
  pageNumber:number=1;
  searchTerms = new BehaviorSubject<any>({"pageSize": this.pageSize, "pageNumber": this.pageNumber});

  _listFilter = '';
  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
    this.filteredStudents = this.listFilter ? this.performFilter(this.listFilter) : this.students;
  }

  constructor(private studentService: StudentService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listFilter = this.route.snapshot.queryParamMap.get('filterBy') || '';

    this.studentService.getStudents().subscribe({
    next: students => {
      this.students = students;
      this.filteredStudents = this.performFilter(this.listFilter);
      this.totalLength=students.length;
      this.students$ = this.getMapData(this.searchTerms);
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
      window.location.reload();
    }
  }
  getMapData(searchTerms: Observable<Filter>) {
    return searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(1000),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap(input => {
        let pageNumber = input.pageNumber;
        let pageSize = input.pageSize;

        if (pageNumber && pageSize) {
          return this.studentService.getStudentsPaging(pageSize, pageNumber);
        } else {
          return of([]);
        }
      })
    );
  }
  previous(){
    if( this.page!=1)
    {
      this.page--;
    }   
  }

  next(){
    this.left=this.filteredStudents.length;
    while (this.left<0)
    {
      this.page++;
      this.left-this.pageSize;
    }
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.searchTerms.next({"pageSize": this.pageSize ,"pageNumber": this.pageNumber});
  }

  onPageNumberChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.searchTerms.next({"pageSize": this.pageSize ,"pageNumber": this.pageNumber});
  }
}
