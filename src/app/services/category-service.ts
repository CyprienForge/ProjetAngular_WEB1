import { Injectable } from '@angular/core';
import { Category } from '../models/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private url:string = "https://68dd25eb7cd1948060ac9cad.mockapi.io/categories"

  constructor(
    private http:HttpClient
  ){}

  getAll() : Observable<Category[]>{
    return this.http.get<Category[]>(this.url)
  }

  getById(id: number) : Observable<Category>{
    return this.http.get<Category>(this.url + '/' + id)
  }
}
