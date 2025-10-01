import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-movie-display',
  imports: [RouterLink],
  templateUrl: './movie-display.html',
  styleUrl: './movie-display.css'
})
export class MovieDisplay {
  public vu:boolean = false

  @Input() movie!:Movie

  voir(movie: Movie) {
    if(this.vu == false){
      this.vu = true;
      return
    }
    this.vu = false
  }
}
