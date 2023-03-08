import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, tap } from 'rxjs';
import { take } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Course } from './course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = `${environment.API}courses`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Course>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadByID(id: number) {
    return this.http.get<Course>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(course: Course) {
    return this.http.post(this.API, course).pipe(
      take(1)
    );
  }

  private update(course: Course) {
    return this.http.put(`${this.API}/${course.id}`, course).pipe(
      take(1)
    );
  }

  save(course: Course) {
    if (course.id) {
      return this.update(course);
    }
    return this.create(course);
  }

  remove(id: number) {
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }
}
