import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';
import { Rate } from '../../models/rate';
import { RateService } from '../../services/rate/rate-service';
import { Movie } from '../../models/movie';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-star',
  imports: [MatIconModule],
  templateUrl: './star.html',
  styleUrl: './star.css'
})
export class Star {
  @Input() movie!:Movie
  @Input() indexStar!:number
  @Input() rate!:number|undefined
  @Output() sendNumberStar:EventEmitter<number> = new EventEmitter()

  public isYellow:boolean = false

  constructor(
    private rateService:RateService,
    private localStorageService:LocalStorageService
  ){}

  ngOnInit(){
    if(this?.rate == undefined) return
    if(this.indexStar <= this.rate){
      this.isYellow = true;
      return
    }
    this.isYellow = false
  }

  addRate(score:number){
    const user:User|null = this.localStorageService.getUser()
    if(user == null) return;
    const rate:Rate = {
      id: "0",
      idMovie: this.movie.id,
      idUser: user.id,
      rate: score
    }

    this.rateService.addOrReplace(rate)
    this.sendNumberStar.emit(score)
  }
}
