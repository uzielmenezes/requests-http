import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CoursesFormComponent } from './courses-form/courses-form.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseResolverGuard } from './guards/course-resolver.guard';

const routes: Routes = [
  { path: '', component: CoursesListComponent },
  {
    path: 'new', component: CoursesFormComponent,
    resolve: {
      course: CourseResolverGuard
    }
  },
  {
    path: 'edit/:id', component: CoursesFormComponent,
    resolve: {
      course: CourseResolverGuard
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingModule { }
