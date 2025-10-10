import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  
  connect(user: User) : void{
    window.localStorage.setItem("login", JSON.stringify(user))
  }

  isConnected() : boolean{
    const user:string|null = window.localStorage.getItem("login")
    return user != null
  }

  getUser() : User|null{
    const userJson:string|null = window.localStorage.getItem("login")
    if(userJson == null){
      return null
    }
    const user:User = JSON.parse(userJson)
    return user
  }

  disconnect() : void{
    window.localStorage.removeItem("login")
  }
}
