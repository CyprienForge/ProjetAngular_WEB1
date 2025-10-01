import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router)
  public errorMessage = "";
  private user:User = { login: "", password: "" }

  userForm:FormGroup = new FormGroup({
    login: new FormControl<string>(this.user.login, [
      Validators.required
    ]),
    password: new FormControl<string>(this.user.password, [
      Validators.required
    ])
  })

  get login(){
    return this.userForm.get('login')
  }

  get password(){
    return this.userForm.get('password')
  }

  submit(event: Event){
    event.preventDefault()

    this.user = this.userForm.value
    if(this.user.login !== this.user.password){
      this.errorMessage = "Mauvaise combinaison";
      return;
    }

    this.errorMessage = "";
    this.router.navigate(['/accueil'])
  }
}
