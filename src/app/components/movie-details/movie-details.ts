import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../../services/movie/film-service';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';
import { Actor } from '../../models/actor';
import { ActorService } from '../../services/actor/actor-service';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category-service';
import { Menu } from '../menu/menu';
import { AddRate } from '../add-rate/add-rate';

@Component({
  selector: 'app-movie-details',
  imports: [Menu, AddRate],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css'
})
export class MovieDetails {
  public movie!:Movie
  private sub:Subscription = new Subscription()
  private route = inject(ActivatedRoute)
  private _id:string = this.route.snapshot.params['id']
  public actors:Actor[] = []
  public category!:Category;

  constructor(
    private movieService:MovieService,
    private actorService:ActorService,
    private categoryService:CategoryService
  ){}

  ngOnInit(){
    this.sub.add(this.movieService.getById(this._id).subscribe({
      next: movie => {
        this.movie = movie;
        this.sub.add(this.categoryService.getById(this.movie.category).subscribe({
          next: category => this.category = category,
          error: error => console.error("Cette catégorie n'existe pas")
        }))

        if(this.movie.actors != null){
          this.movie.actors.forEach(idActor => {
            this.sub.add(this.actorService.getByid(idActor).subscribe({
              next: actor => this.actors.push(actor),
              error: error => console.error("Cet acteur n'existe pas")
            }))
          })
        }

      },
      error: error => console.error(error)
    }))
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
