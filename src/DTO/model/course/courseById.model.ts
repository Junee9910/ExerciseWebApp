import { StudentByCourseId } from '../student/studentByCourseId.model';
export class CourseById {
    courseID: number=0;
    name: string='';
    department: string='';
    students: StudentByCourseId[]=[];
}