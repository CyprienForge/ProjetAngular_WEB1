import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../services/category/category-service';
import { Subscription } from 'rxjs';
import { UIMovie } from '../../models/ui-movies';
import { Category } from '../../models/category';

@Component({
  selector: 'app-movie-display',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './movie-display.html',
  styleUrl: './movie-display.css'
})
export class MovieDisplay {
  private sub:Subscription = new Subscription()
  public labelCategory:string = "";

  @Input() categories :  Category[] = []
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
    const categorie : Category | undefined = this.categories.find((c) => c.id == this.movie.category)
    if(categorie == undefined){
      return;
    }
    this.labelCategory = categorie.label
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
