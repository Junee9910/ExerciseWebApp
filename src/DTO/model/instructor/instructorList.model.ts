import { CourseByInstructor } from '../course/courseByInstructor.model';
export class InstructorList {
    instructorID: number=0;
    fullName: string='';
    locationIn: string='';
    courses:CourseByInstructor[]=[];
}