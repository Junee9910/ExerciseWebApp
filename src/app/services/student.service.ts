import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentList } from 'src/DTO/model/student/studentList.model';
import { tap, map } from 'rxjs/operators';
import { StudentCreate } from '../../DTO/model/student/studentCreate.model';
import { Student } from 'src/DTO/entity/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  readonly studentURL = 'https://localhost:44337/Student/list'

  getStudents():Observable<StudentList[]>{
    return this.http.get<StudentList[]>(this.studentURL)
    .pipe(
      tap(data=>console.log(JSON.stringify(data)))
    );
  }
}
