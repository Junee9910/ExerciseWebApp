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

  readonly baseURL = 'http://localhost:44337/Student/list'

  getStudents():Observable<StudentList[]>{
    return this.http.get<StudentList[]>(this.baseURL)
    .pipe(
      tap(data=>console.log(JSON.stringify(data))),
    );
  }

  getStudent(id: number): Observable<StudentList> {
    const url = `${this.baseURL}/${id}`;
    return this.http.get<StudentList>(url)
      .pipe(
        tap(data => console.log('getStudent: ' + JSON.stringify(data))),
      );
  }

  getStudentsPaging(sortOrder: string, keyword: string, pageIndex: number, pageSize: number): Observable<StudentList[]> {
    const url = `${this.baseURL}/paging?sortOrder=${sortOrder}&keyword=${keyword}&pageIndex=${pageIndex}&pageSize=${pageSize}`;
    return this.http.get<StudentList[]>(url)
      .pipe(
        tap(data => console.log('getStudent: ' + JSON.stringify(data))),
      );
  }

  createStudent(student: StudentCreate): Observable<StudentCreate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<StudentCreate>(this.baseURL, student, { headers })
      .pipe(
        tap(data => console.log('createStudent: ' + JSON.stringify(data))),
      );
  }

  deleteStudent(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.baseURL}/${id}`;
    return this.http.delete<Student>(url, { headers })
      .pipe(
        tap(data => console.log('deleteStudent: ' + id)),
      );
  }

  updateStudent(student: StudentList): Observable<StudentList> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<StudentList>(this.baseURL, student, { headers })
      .pipe(
        tap(() => console.log('updateStudent: ' + student.studentId)),
        // Return the product on an update
        map(() => student),
      );
  }
}
