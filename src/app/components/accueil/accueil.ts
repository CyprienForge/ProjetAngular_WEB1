import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/film-service';
import { Subscription } from 'rxjs';
import { Menu } from '../menu/menu';
import { MovieDisplay } from '../movie-display/movie-display';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage-service';
import { SearchForm } from '../search-form/search-form';

@Component({
  selector: 'app-accueil',
  imports: [Menu, MovieDisplay, SearchForm],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  private sub:Subscription = new Subscription
  public movies:Movie[] = []
  public user:User|null = { id: 0, login: "", password: "" }

  constructor(
    private movieService:MovieService,
    private localStorageService:LocalStorageService
  ){}

  getMoviesFilter(movies:Movie[]){
    this.movies = movies
  }

  ngOnInit(){
    this.sub.add(this.movieService.getAll().subscribe({
      next: movies => {
        this.movies = movies;
      },
      error: error => console.error(error)
    }))

    this.user = this.localStorageService.getUser()
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
