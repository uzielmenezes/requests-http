import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, Observable, Subject, switchMap } from 'rxjs';
import { take } from 'rxjs/operators';

import { Course } from '../course';
import { AlertModalService } from './../../shared/alert-modal.service';
import { Courses2Service } from './../courses2.service';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  preserveWhitespaces: true,
})
export class CoursesListComponent implements OnInit {

  // bsModalRef!: BsModalRef;

  // courses!: Course[];

  deleteModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal: any;

  // using pipe async
  courses$!: Observable<Course[]>;
  error$ = new Subject<boolean>();

  selectedCourse!: Course;

  constructor(
    private service: Courses2Service,
    private modalService: BsModalService,
    private alertModalService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.service.list().subscribe(data => this.courses = data);
    // with pipe async
    this.onRefresh();
  }

  onRefresh() {
    this.courses$ = this.service.list()
      .pipe(
        catchError(err => {
          console.error(err);
          /* this.error$.next(true); */
          this.handError();
          return EMPTY;
        })
      );
    // this.service.list()
    //   .pipe(
    //     catchError(error => empty())
    //   )
    //   .subscribe(
    //     (data: any) => {
    //       console.log(data);
    //     },
    //     error => console.error(error),
    //     () => console.log('Observable Completo!')
    //   );
  }

  handError() {
    // this.bsModalRef = this.modalService.show(AlertModalComponent);
    // this.bsModalRef.content.type = 'danger';
    // this.bsModalRef.content.message = 'Erro ao carregar cursos, tente novamente mais tarde!';
    this.alertModalService.showAlertDanger('Erro ao carregar cursos, tente novamente mais tarde!');
  }

  onEdit(id: number) {
    this.router.navigate(['edit', id], { relativeTo: this.route });
  }

  onDelete(course: Course) {
    this.selectedCourse = course;
    // this.deleteModalRef = this.modalService.show(this.deleteModal, { class: 'modal-sm' });
    const result$ = this.alertModalService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?')
    result$.asObservable()
      .pipe(
        take(1),
        switchMap(result => result ? this.service.remove(course.id) : EMPTY)
      )
      .subscribe({
        next: () => {
          this.alertModalService.showAlertSuccess('Curso removido com sucesso!');
          this.onRefresh();
        },
        error: () => {
          this.alertModalService.showAlertDanger('Erro ao remover curso, tente novamente mais tarde!');
        }
      });
  }

  // onConfirmDelete() {
  //   this.service.remove(this.selectedCourse.id)
  //     .subscribe(
  //       success => {
  //         this.onRefresh()
  //         this.returnFromModal()

  //       },
  //       error => {
  //         this.alertModalService.showAlertDanger('Erro ao remover curso, tente novamente mais tarde!')
  //         this.returnFromModal()
  //       }
  //     );
  // }

  // returnFromModal() {
  //   this.deleteModalRef.hide();
  // }
}
