import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../help/app.state';
import { registerAction } from '../../help/app.action';
import { Observable, of } from 'rxjs';
import { isSubmittingSelector } from '../../help/selector';

@Component({
  selector: 'app-autorization',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './autorization.component.html',
  styleUrl: './autorization.component.scss'
})
export class AutorizationComponent {

  message : string | null = null; // Переменная для хранения сообщения об ошибке
  router: Router = inject(Router)

  isSubmitting$ : Observable<boolean> = of(false)
  errorMessage: string | null = null; // Переменная для хранения сообщения об ошибке

  myForm: FormGroup
  constructor(private authService: AuthService, private store: Store<AppState>){
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    if(this.myForm.valid){
      this.authService.autorization(this.myForm.value).subscribe(
        {
          next: response =>{
            console.log(response);
            this.message = 'Вы успешно создали аккаунт'
          }
        }
      )
    }
    this.store.dispatch(registerAction())

    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector))
  }

}
