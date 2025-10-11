import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category-service';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/film-service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatInputModule, MatSelectModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css'
})
export class SearchForm {
  private filterMovies:Movie[] = []
  public categories:Category[] = []
  private categoryForm:Category = { id: 0, label: "" }
  private sub:Subscription = new Subscription()
  @Output() sendMovies:EventEmitter<Movie[]> = new EventEmitter<Movie[]>

  constructor(
    private categoryService:CategoryService,
    private movieService:MovieService
  ){}

  searchForm:FormGroup = new FormGroup({
    name: new FormControl<string>('', []),
    category: new FormControl<Category>(this.categoryForm, []),
    isView: new FormControl<boolean>(false, [])
  })

  get name(){
    return this.searchForm.get('name')
  }

  get category(){
    return this.searchForm.get('category')
  }

  get isView(){
    return this.searchForm.get('isView')
  }


  submit(event: Event) {
    event.preventDefault();

    const { name, category, isView } = this.searchForm.value;
    console.log(category)

    this.sub.add(
      this.movieService.getAll().subscribe({
        next: (movies:Movie[]) => {
          this.filterMovies = movies.filter((movie:Movie) => {
            const matchName = !name || movie.name.toLowerCase().includes(name.toLowerCase());
            const matchCategory = !category || movie.category === category.id
            return matchName && matchCategory;
          });

          this.sendMovies.emit(this.filterMovies)
        },
        error: (err) => console.error('Erreur lors du filtrage :', err),
      })
    );

    this.searchForm.reset()
  }


  ngOnInit(){
    this.sub.add(this.categoryService.getAll().subscribe({
      next: categories => this.categories = categories
    }))
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
