import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StudentListComponent } from './student-list/student-list.component';
import { StudentEditComponent } from './student-edit/student-edit.component';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentAddComponent } from './student-add/student-add.component';

import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    imports: [
        SharedModule,
      RouterModule.forChild([
          { 
            path: 'student', 
            component: StudentListComponent
          },
          { 
            path: 'student/add', 
            component: StudentAddComponent
          },
          {
            path: 'student/:id', 
            component: StudentDetailComponent
          },
          {
            path: 'student/:id/edit', 
            component: StudentEditComponent
          }
      ])
    ],
    declarations: [
      StudentListComponent,
      StudentEditComponent,
      StudentDetailComponent,
      StudentAddComponent
    ]
  })
  export class StudentModule { }