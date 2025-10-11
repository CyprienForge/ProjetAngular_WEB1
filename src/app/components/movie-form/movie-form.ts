import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Movie } from '../../models/movie';
import { Category } from '../../models/category';
import { Actor } from '../../models/actor';
import { MovieService } from '../../services/movie/film-service';
import { Subscription } from 'rxjs';
import { CategoryService } from '../../services/category-service';
import { ActorService } from '../../services/actor-service';
import { Menu } from '../menu/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-movie-form',
  imports: [ReactiveFormsModule, Menu, MatButtonModule, MatSelectModule, MatInputModule],
  templateUrl: './movie-form.html',
  styleUrl: './movie-form.css'
})
export class MovieForm {
  private categoryEmpty:Category = { id:0, label: "" }
  private movie:Movie = { id:0, name: "", category: 0, actors: [] }
  public categories:Category[] = []
  public actorsSelect:Actor[] = []
  private sub:Subscription = new Subscription

  constructor(
    private categoryService:CategoryService,
    private actorService:ActorService,
    private movieService:MovieService
  ){}

  movieForm:FormGroup = new FormGroup({
    name: new FormControl<string>(this.movie.name, [
      Validators.required
    ]),
    actors: new FormControl<number[]>([]),
    category: new FormControl<number | null>(null, [
      Validators.required
    ])
  })

  get name(){
    return this.movieForm.get('name')
  }

  get actors(){
    return this.movieForm.get('actors')
  }

  get category(){
    return this.movieForm.get('category')
  }

  submit(event: Event){
    event.preventDefault()

    this.movie = this.movieForm.value
    this.movie.category = Number(this.movieForm.get('category')?.value)

    const actorsToAdd:number[] = []
    const actors:number[] = this.movieForm.get('actors')?.value;
    if(actors !== null){
      actors.forEach((actor) => {
        actorsToAdd.push(Number(actor))
      })
    }

    this.movie.actors = actorsToAdd

    this.movieService.add(this.movie)
    this.movieForm.reset()
  }

  ngOnInit(){
    this.sub.add(this.categoryService.getAll().subscribe({
      next: categories => this.categories = categories
    }))

    this.sub.add(this.actorService.getAll().subscribe({
      next: actors => this.actorsSelect = actors
    }))
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
