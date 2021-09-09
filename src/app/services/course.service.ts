import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseList } from '../../DTO/model/course/courseList.model';
import { CourseByInstructor } from '../../DTO/model/course/courseByInstructor.model';
import { CourseById } from '../../DTO/model/course/courseById.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  readonly coursesURL = 'https://localhost:44337/Course/list'
  readonly courseURL = 'https://localhost:44337/Course'

  getCourses():Observable<CourseList[]>{
    return this.http.get<CourseList[]>(this.coursesURL)
    .pipe(
      tap(src=>console.log(JSON.stringify(src)))
    );
  }

  getcourse(id: number): Observable<CourseById> {
    const url = `${this.courseURL}/${id}`;
    return this.http.get<CourseById>(url)
      .pipe(
        tap(data => console.log('getStudent: ' + JSON.stringify(data))),
      );
  }
}
