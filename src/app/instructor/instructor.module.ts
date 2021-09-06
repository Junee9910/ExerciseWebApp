import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { InstructorListComponent } from './instructor-list/instructor-list.component';
import { InstructorEditComponent } from './instructor-edit/instructor-edit.component';
import { InstructorDetailComponent } from './instructor-detail/instructor-detail.component';
import { InstructorAddComponent } from './instructor-add/instructor-add.component';

import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
      SharedModule,
    RouterModule.forChild([
        { 
          path: 'instructor', 
          component: InstructorListComponent
        },
        { 
          path: 'instructor/add', 
          component: InstructorAddComponent
        },
        { 
          path: 'instructor/:id', 
          component: InstructorDetailComponent
        },
        { 
          path: 'instructor/edit/:id', 
          component: InstructorEditComponent
        },
          
    ])
  ],
  declarations: [
    InstructorListComponent,
    InstructorEditComponent,
    InstructorDetailComponent,
    InstructorAddComponent
  ]
})
export class InstructorModule { }