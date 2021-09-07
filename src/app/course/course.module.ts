import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CourseListComponent } from './course-list/course-list.component';
import { CourseByIdComponent } from './course-by-id/course-by-id.component';

import { SharedModule } from 'src/shared/shared.module';
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
        { path: 'courses', component: CourseListComponent},
        { path: 'courses/:id', component: CourseByIdComponent},
    ])
  ],
  declarations: [
    CourseListComponent,
    CourseByIdComponent
  ]
})
export class CourseModule { }