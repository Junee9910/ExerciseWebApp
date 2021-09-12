import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InstructorList } from '../../DTO/model/instructor/instructorList.model';
import { Observable } from 'rxjs';
import { tap, map} from 'rxjs/operators';
import { Instructor } from '../../DTO/entity/instructor.model';
import { InstructorCreate } from '../../DTO/model/instructor/instructorCreate.model';
import { InstructorEdit } from 'src/DTO/model/instructor/instructorEdit.model';

@Injectable({
  providedIn: 'root'
})
export class InstructorService {

  constructor(private http: HttpClient) { }

  readonly instructorsURL = 'https://localhost:44337/Instructor/list'
  readonly instructorURL = 'https://localhost:44337/Instructor'

  getInstructors(): Observable<InstructorList[]> {
    return this.http.get<InstructorList[]>(this.instructorsURL)
      .pipe(
        tap(data => console.log(JSON.stringify(data)))
      );
  }

  getInstructor(id: number):Observable<InstructorList>{
    const url = `${this.instructorURL}/${id}`;
    return this.http.get<InstructorList>(url)
    .pipe(
      tap(src=>console.log(JSON.stringify(src)))
    );
  }

  createInstructor(instructor: InstructorCreate): Observable<InstructorCreate> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<InstructorCreate>(this.instructorURL, instructor, { headers })
      .pipe(
        tap(data => console.log('Create Instructor: ' + JSON.stringify(data))),
      );
  }

  deleteInstructor(id: number): Observable<{}> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.instructorURL}/${id}`;
    return this.http.delete<Instructor>(url, { headers })
      .pipe(
        tap(data => console.log('Delete Instructor: ' + id)),
      );
  }

  updateInstructor(instructor: InstructorEdit): Observable<InstructorEdit> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.instructorURL}/${instructor.instructorID}`;
    return this.http.put<InstructorEdit>(url, instructor, { headers })
      .pipe(
        tap(() => console.log('update Instructor: ' + instructor.instructorID)),
        // Return the product on an update
        map(() => instructor),
      );
  }
}
