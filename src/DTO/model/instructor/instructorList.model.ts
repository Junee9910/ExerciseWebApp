import { CourseByInstructor } from '../course/courseByInstructor.model';
export class InstructorList {
    instructorId: number=0;
    fullName: string='';
    location: string='';
    course:CourseByInstructor[]=[];
}