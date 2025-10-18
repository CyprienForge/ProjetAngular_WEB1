import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../services/category/category-service';
import { Subscription } from 'rxjs';
import { UIMovie } from '../../models/ui-movies';

@Component({
  selector: 'app-movie-display',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './movie-display.html',
  styleUrl: './movie-display.css'
})
export class MovieDisplay {
  private sub:Subscription = new Subscription()
  public labelCategory:string = "";

  @Input() movie!:UIMovie
  @Output() viewMovie:EventEmitter<UIMovie> = new EventEmitter<UIMovie>;

  constructor(
    private categoryService:CategoryService
  ){}

  voir(movie: Movie) {
    if(this.movie.vu == false){
      this.movie.vu = true;
      this.viewMovie.emit(movie)
      return
    }
    this.movie.vu = false
  }

  ngOnInit(){
    this.sub.add(this.categoryService.getById(this.movie.category).subscribe({
      next: category => {
        this.labelCategory = category.label
      },
      error: error => {
        console.error('Catégorie inexistante ' + this.movie.category)
      }
    }))
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
