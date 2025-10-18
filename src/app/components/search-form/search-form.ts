import { Component, EventEmitter, Input, NgModule, Output } from '@angular/core';
import { FormControl, FormControlName, FormGroup, NgModel, ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from '../../models/category';
import { CategoryService } from '../../services/category/category-service';
import { Subscription } from 'rxjs';
import { Movie } from '../../models/movie';
import { MovieService } from '../../services/movie/film-service';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UIMovie } from '../../models/ui-movies';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-search-form',
  imports: [ReactiveFormsModule, MatInputModule, MatButtonModule, MatSelectModule, MatCheckboxModule, MatCardModule],
  templateUrl: './search-form.html',
  styleUrl: './search-form.css'
})
export class SearchForm {
  @Input() movies: UIMovie[] = [];            // liste affichée
  private allMovies: UIMovie[] = [];          // copie de référence (jamais modifiée)
  @Output() sendMovies = new EventEmitter<UIMovie[]>();

  public categories: Category[] = [];
  private sub: Subscription = new Subscription();

  constructor(
    private categoryService: CategoryService
  ) {}

  searchForm = new FormGroup({
    name: new FormControl<string>(''),
    category: new FormControl<Category | null>(null),
    isView: new FormControl<boolean | null>(null)
  });

  ngOnChanges() {
    if (this.movies.length > 0 && this.allMovies.length === 0) {
      this.allMovies = [...this.movies];
    }
  }

  submit(event: Event) {
    event.preventDefault();
    const { name, category, isView } = this.searchForm.value;

    const hasName = !!(name && name.trim() != '');
    const hasCategory = !!(category && category.id != 0);
    const hasIsView = isView != null && isView != undefined;

    let filteredMovies: UIMovie[];

    if (!hasName && !hasCategory && !hasIsView) {
      filteredMovies = [...this.allMovies];
    } else {
      filteredMovies = this.allMovies.filter((movie: UIMovie) => {
        let match = true;

        if (hasName) {
          match = match && movie.name.toLowerCase().includes(name.toLowerCase());
        }

        if (hasCategory) {
          match = match && movie.category == category.id;
        }

        if (hasIsView) {
          match = match && movie.vu == isView;
        }

        return match;
      });
    }

    this.sendMovies.emit(filteredMovies);
  }

  ngOnInit() {
    this.sub.add(
      this.categoryService.getAll().subscribe({
        next: categories => (this.categories = categories)
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
