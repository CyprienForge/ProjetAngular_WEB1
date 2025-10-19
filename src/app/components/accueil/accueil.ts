import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/film-service';
import { Subscription } from 'rxjs';
import { Menu } from '../menu/menu';
import { MovieDisplay } from '../movie-display/movie-display';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage-service';
import { SearchForm } from '../search-form/search-form';
import { UIMovie } from '../../models/ui-movies';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category-service';

@Component({
  selector: 'app-accueil',
  imports: [Menu, MovieDisplay, SearchForm],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  public categories : Category[] = [];
  private sub:Subscription = new Subscription
  public movies:UIMovie[] = []
  public user:User|null = { id: 0, login: "", password: "" }

  constructor(
    private movieService:MovieService,
    private categoryService : CategoryService,
    private localStorageService:LocalStorageService
  ){}

  getMoviesFilter(movies:UIMovie[]){
    this.movies = movies
  }

  getMovieView(movie: UIMovie) {
    const index = this.movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.movies[index].vu = movie.vu;
    }

    console.log(this.movies[index])
  }

  loadCategories(){
    this.categoryService.getAll().subscribe({
      next: categories => this.categories = categories
    });
  }

  ngAfterViewInit() {
    if (this.categories.length === 0) {
      this.loadCategories()
    }
  }

  ngOnInit(){
    this.sub.add(this.movieService.getAll().subscribe({
      next: movies => {
        this.movies = movies;
      },
      error: error => console.error(error)
    }))

    this.loadCategories()

    this.user = this.localStorageService.getUser()
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }

}
