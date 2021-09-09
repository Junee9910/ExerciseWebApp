import { EnrollmentCourseById } from '../enrollment/enrollmentCourseById.model';
export class StudentEnrollment{
    studentID:number=0;
    lastName:string='';
    firstMidName:string='';
    courses: EnrollmentCourseById[]=[];
}