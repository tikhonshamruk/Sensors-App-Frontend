import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {

  router: Router = inject(Router)

  errorMessage: string | null = null; // Переменная для хранения сообщения об ошибке

  myForm: FormGroup
  constructor(private authService: AuthService){
    this.myForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    if(this.myForm.valid){
      this.authService.login(this.myForm.value).subscribe(
        {
          next: response =>{
            console.log(response);
            this.router.navigate([''])
          }, 
          error: err => {
            this.errorMessage = 'Не удалось войти. Пожалуйста, проверьте свои учетные данные.'; // Устанавливаем сообщение об ошибке
          }
        }
      )
    }
  }
}
