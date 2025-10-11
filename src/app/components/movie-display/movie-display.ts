import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CategoryService } from '../../services/category/category-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-display',
  imports: [RouterLink, MatButtonModule, MatCardModule],
  templateUrl: './movie-display.html',
  styleUrl: './movie-display.css'
})
export class MovieDisplay {
  private sub:Subscription = new Subscription()
  public labelCategory:string = "";
  public vu:boolean = false

  @Input() movie!:Movie

  constructor(
    private categoryService:CategoryService
  ){}

  voir(movie: Movie) {
    if(this.vu == false){
      this.vu = true;
      return
    }
    this.vu = false
  }

  ngOnInit(){
    this.sub.add(this.categoryService.getById(this.movie.category).subscribe({
      next: category => this.labelCategory = category.label
    }))
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
