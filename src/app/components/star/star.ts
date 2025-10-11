import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';
import { Rate } from '../../models/rate';
import { RateService } from '../../services/rate/rate-service';
import { Movie } from '../../models/movie';

@Component({
  selector: 'app-star',
  imports: [MatIconModule],
  templateUrl: './star.html',
  styleUrl: './star.css'
})
export class Star implements OnChanges {
  @Input() movie!: Movie;
  @Input() indexStar!: number;
  @Input() rate!: number | undefined;
  @Output() sendNumberStar: EventEmitter<number> = new EventEmitter();

  public isYellow: boolean = false;

  constructor(
    private rateService: RateService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if ('rate' in changes) {
      this.updateColor();
    }
  }

  private updateColor() {
    this.isYellow = this.rate !== undefined && this.indexStar <= this.rate;
  }

  addRate(score: number) {
    const user: User | null = this.localStorageService.getUser();
    if (user == null) return;

    const rate: Rate = {
      id: "0",
      idMovie: this.movie.id,
      idUser: user.id,
      rate: score
    };

    this.rateService.addOrReplace(rate);

    this.rate = score;
    this.updateColor();

    this.sendNumberStar.emit(score);
  }
}
