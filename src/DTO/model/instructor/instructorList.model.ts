import { CourseByInstructor } from '../course/courseByInstructor.model';
export class InstructorList {
    instructorID: number=0;
    lastName:string='';
    firstMidName:string='';
    fullName: string='';
    locationIn: string='';
    office: string='';
    hireDate:Date;
    courses:CourseByInstructor[]=[];
}