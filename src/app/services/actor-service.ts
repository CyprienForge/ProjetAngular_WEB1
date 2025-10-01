import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Actor } from '../models/actor';

@Injectable({
  providedIn: 'root'
})
export class ActorService {
  
  private url:string = "https://68dd25eb7cd1948060ac9cad.mockapi.io/actors";

  constructor(
    private http:HttpClient
  ){}

  getAll() : Observable<Actor[]>{
    return this.http.get<Actor[]>(this.url)
  }

  getByid(id: number) : Observable<Actor>{
    return this.http.get<Actor>(this.url + '/' + id)
  }
}
