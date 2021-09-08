import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CourseList } from '../../DTO/model/course/courseList.model';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }

  readonly courseURL = 'https://localhost:44337/Course/list'

  getCourses():Observable<CourseList[]>{
    return this.http.get<CourseList[]>(this.courseURL)
    .pipe(
      tap(src=>console.log(JSON.stringify(src)))
    );
  }
}
