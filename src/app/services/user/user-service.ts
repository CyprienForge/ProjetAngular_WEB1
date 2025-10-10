import { Injectable } from '@angular/core';
import { USERS } from '../../data/users.stub';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private users:User[] = USERS;

  getUserByLogin(login: string) : User|undefined{
    let userSearch : User | undefined = undefined
    this.users.forEach((user) => {
      if(user.login == login){
        userSearch = user
      }
    })

    return userSearch
  }

}
