import { EnrollmentCourseById } from '../enrollment/enrollmentCourseById.model';
export class StudentEnrollment{
    studentID:number=0;
    lastName:string='';
    firstMidName:string='';
    Id: number=0;
    fullName: string='';
    courses: EnrollmentCourseById[]=[];
}