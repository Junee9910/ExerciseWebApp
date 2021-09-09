import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StudentList } from 'src/DTO/model/student/studentList.model';
import { map, tap } from 'rxjs/operators';
import { StudentCreate } from '../../DTO/model/student/studentCreate.model';
import { Student } from '../../DTO/entity/student.model';
import { StudentEdit } from '../../DTO/model/student/studentEdit.model';
import { StudentEnrollment } from '../../DTO/model/student/studentEnrollmentCourseById.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  constructor(private http: HttpClient) { }

  readonly studentsURL = 'https://localhost:44337/Student/list'
  readonly studentURL = 'https://localhost:44337/Student'

  getStudents():Observable<StudentList[]>{
    return this.http.get<StudentList[]>(this.studentsURL)
    .pipe(
      tap(data=>console.log(JSON.stringify(data)))
    );
  }

  getStudent(id: number): Observable<StudentEnrollment> {
    const url = `${this.studentURL}/GetByCourse?id=${id}`;
    return this.http.get<StudentEnrollment>(url)
      .pipe(
        tap(data => console.log('getStudent: ' + JSON.stringify(data))),
      );
  }

  createStudent(student: StudentCreate): Observable<StudentCreate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<StudentCreate>(this.studentURL, student, { headers })
      .pipe(
        tap(data => console.log('createStudent: ' + JSON.stringify(data))),
      );
  }

  deleteStudent(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.studentURL}/${id}`;
    return this.http.delete<Student>(url, { headers })
      .pipe(
        tap(data => console.log('deleteStudent: ' + id)),
      );
  }

  updateStudent(student: StudentEdit): Observable<StudentEdit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put<StudentList>(this.studentURL, student, { headers })
      .pipe(
        tap(() => console.log('updateStudent: ' + student.Id)),
        map(() => student),
      );
  }
}
