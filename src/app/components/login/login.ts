import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { LocalStorageService } from '../../services/local-storage-service';
import { UserService } from '../../services/user/user-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatButtonModule, MatInputModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router)
  public errorMessage = "";
  private user:User = { id: 0, login: "", password: "" }

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

  constructor(
    private localStorageService:LocalStorageService,
    private userService:UserService
  ){}

  ngOnInit(){
    const isConnected = this.localStorageService.isConnected()
    if(isConnected){
      this.router.navigate(['/accueil'])
    }
  }

  submit(event: Event){
    event.preventDefault()

    this.user = this.userForm.value
    if(this.user.login !== this.user.password){
      this.errorMessage = "Mauvaise combinaison ou utilisateur inexistant !";
      return;
    }

    const userSearch : User | undefined = this.userService.getUserByLogin(this.user.login)
    if(userSearch == undefined){
      this.errorMessage = "Mauvaise combinaison ou utilisateur inexistant !";
      return;
    }

    this.user.id = userSearch.id
    this.errorMessage = "";
    this.localStorageService.connect(this.user)
    this.router.navigate(['/accueil'])
  }
}
