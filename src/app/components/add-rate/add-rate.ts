import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Movie } from '../../models/movie';
import { RateService } from '../../services/rate/rate-service';
import { Rate } from '../../models/rate';
import { LocalStorageService } from '../../services/local-storage-service';
import { User } from '../../models/user';
import { Subscription } from 'rxjs';
import { Star } from '../star/star';

@Component({
  selector: 'app-add-rate',
  imports: [Star],
  templateUrl: './add-rate.html',
  styleUrl: './add-rate.css'
})
export class AddRate {
  @Input() movie!:Movie

  private sub:Subscription = new Subscription()
  public rateNumber:number|undefined = undefined
  public nbStars = 5;

  public nbStarsArray(): number[] {
    return Array.from({ length: this.nbStars }, (_, i) => i + 1);
  }

  constructor(
    private rateService:RateService,
    private localStorageService:LocalStorageService
  ){}

  getNumberStar(numberStar:number){
    console.log("Nouveau nombre d'étoiles : " + numberStar)
    this.rateNumber = numberStar
  }

  ngOnInit(){
    const currentUser : User | null = this.localStorageService.getUser()
    if(currentUser == undefined) return;

    this.sub.add(this.rateService.getAll().subscribe({
      next: rates => { 
        const existingRate = rates.find(r => r.idMovie === this.movie.id && r.idUser === currentUser.id);
        if(existingRate){
          this.rateNumber = existingRate?.rate
        }else{
          this.rateNumber = 0
        }
      },
      error: error => {
        this.rateNumber = 0;
      }
    }))
  }

  ngOnDestroy(){
    this.sub.unsubscribe()
  }
}
