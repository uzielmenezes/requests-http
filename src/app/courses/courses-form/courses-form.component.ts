import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AlertModalService } from './../../shared/alert-modal.service';
import { Courses2Service } from './../courses2.service';


@Component({
  selector: 'app-courses-form',
  templateUrl: './courses-form.component.html',
  styleUrls: ['./courses-form.component.scss']
})
export class CoursesFormComponent implements OnInit {

  form!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private service: Courses2Service,
    private modal: AlertModalService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    // this.route.params.subscribe(
    //   (params: any) => {
    //     const id = params['id'];
    //     console.log(id);
    //     const course$ = this.service.loadByID(id);
    //     course$.subscribe(course => {
    //       this.updateForm(course);
    //     });
    //   }
    // );

    // this.route.params
    //   .pipe(
    //     map((params: any) => params['id']),
    //     switchMap(id => this.service.loadByID(id))
    //   )
    //   .subscribe((course) => this.updateForm(course));

    const course = this.route.snapshot.data['course'];

    this.form = this.fb.group({
      id: [course.id],
      name: [course.name, [Validators.required, Validators.minLength(3), Validators.maxLength(250)]]
    });
  }

  // updateForm(course: any) {
  //   this.form.patchValue({
  //     id: course.id,
  //     name: course.name
  //   });
  // }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  onSubmit() {
    this.submitted = true;
    console.log(this.form.value);
    if (this.form.valid) {
      console.log('submit');

      let successMsg = 'Curso criado com sucesso!';
      let errorMsg = 'Erro ao criar curso, tente novamente!';
      if (this.form.value.id) {
        successMsg = 'Curso atualizado com sucesso!';
        errorMsg = 'Erro ao atualizar curso, tente novamente!';
      }

      this.service.save(this.form.value).subscribe({
        next: () => {
          this.modal.showAlertSuccess(successMsg);
          this.router.navigate(['/courses']);
        },
        error: () => this.modal.showAlertDanger(errorMsg)
      });
      // if (this.form.value.id) {
      //   this.service.update(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Curso atualizado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.modal.showAlertDanger('Erro ao atualizar curso, tente novamente!'),
      //     () => console.log('update completed')
      //   );
      // } else {
      //   this.service.create(this.form.value).subscribe(
      //     success => {
      //       this.modal.showAlertSuccess('Curso adicionado com sucesso!');
      //       this.location.back();
      //     },
      //     error => this.modal.showAlertDanger('Erro ao criar curso, tente novamente!'),
      //     () => console.log('request completed')
      //   );
      // }
    }
  }

  onCancel() {
    this.submitted = false;
    this.form.reset();
    //  console.log('cancelado');
  }

}
