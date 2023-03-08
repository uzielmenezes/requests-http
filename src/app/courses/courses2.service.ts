import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Course } from './course';
import { CrudService } from './../shared/crud-service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Courses2Service extends CrudService<Course> {

  constructor(protected override http: HttpClient) {
    super(http, `${environment.API}courses`);
  }
}
