import { Injectable } from '@angular/core';
import { Movie } from '../../models/movie';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UIMovie } from '../../models/ui-movies';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private url:string = "https://68dd25eb7cd1948060ac9cad.mockapi.io/movies";

  constructor(private http:HttpClient) {}

  getAll(): Observable<UIMovie[]> {
    return this.http.get<Movie[]>(this.url).pipe(
      map(movies => movies.map(m => ({ ...m, vu: false })))
    );
  }

  getById(id:string): Observable<Movie> {
    return this.http.get<Movie>(`${this.url}/${id}`);
  }

  add(movie:Movie): void {
    this.http.post(this.url, movie).subscribe({
      error: error => console.error(error)
    });
  }
}
