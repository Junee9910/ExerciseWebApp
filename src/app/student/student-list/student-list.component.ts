import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  students!: Observable<StudentList[]>;
  page: number = 1;
  
  name: string = '';
  pageNumber: number = 1;
  pageSize: number = 10;
  searchTerms = new BehaviorSubject<any>({"pageSize": this.pageSize ,"pageNumber":this.pageNumber,"name":this.name});

  constructor(private service: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.students = this.getMapData(this.searchTerms);
  }

  onDelete(id: number){
    if(confirm('Are you sure delete this record?')){
      this.service.deleteStudent(id).subscribe();
    }
  }

  previous(){
    this.page--;
  }

  next(){
    this.page++;
  }

  onPageSizeChange(pageSize: number) {
    this.pageSize = pageSize;
    this.searchTerms.next({ "pageSize": this.pageSize ,"pageNumber":this.pageNumber,"name":this.name});
  }

  onPageIndexChange(pageNumber: number) {
    this.pageNumber = pageNumber;
    this.searchTerms.next({ "pageSize": this.pageSize ,"pageNumber":this.pageNumber,"name":this.name });
  }

  onNameChange(name: string) {
    this.name = name;
    this.searchTerms.next({ "pageSize": this.pageSize ,"pageNumber":this.pageNumber,"name":this.name});
  }

  getMapData(searchTerms: Observable<Filter>) {
    return searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(1000),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap(input => {
        let pageSize = input.pageSize;
        let pageNumber = input.pageNumber;
        let name = input.name;

        if (pageSize && pageNumber && name) {
          return this.service.getStudentsPaging(pageSize, pageNumber,name);
        } else {
          return of([]);
        }
      })
    );
  }
}
