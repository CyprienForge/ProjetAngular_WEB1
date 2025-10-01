import { Component } from '@angular/core';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/film-service';
import { Subscription } from 'rxjs';
import { RouterLink } from '@angular/router';
import { Menu } from '../menu/menu';
import { MovieDisplay } from '../movie-display/movie-display';

@Component({
  selector: 'app-accueil',
  imports: [RouterLink, Menu, MovieDisplay],
  templateUrl: './accueil.html',
  styleUrl: './accueil.css'
})
export class Accueil {
  private sub:Subscription = new Subscription
  public movies:Movie[] = []

  constructor(
    private movieService:MovieService
  ){}

  ngOnInit(){
    this.sub.add(this.movieService.getAll().subscribe({
      next: movies => {
        this.movies = movies;
      },
      error: error => console.error(error)
    }))
  }

}
