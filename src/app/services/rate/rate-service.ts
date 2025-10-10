import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Rate } from '../../models/rate';

@Injectable({
  providedIn: 'root'
})
export class RateService {

  private url: string = 'https://67a87ca5203008941f6a09af.mockapi.io/api/foot/rates';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Rate[]> {
    return this.http.get<Rate[]>(this.url);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`);
  }

  add(rate: Rate): Observable<Rate> {
    return this.http.post<Rate>(this.url, rate);
  }

  addOrReplace(rate: Rate): void {
    this.getAll().pipe(
      switchMap(rates => {
        const existingRate = rates.find(r => r.idMovie === rate.idMovie && r.idUser === rate.idUser);
        if (existingRate) {
          return this.delete(existingRate.id).pipe(
            switchMap(() => this.add(rate))
          );
        } else {
          return this.add(rate);
        }
      }),
      tap(() => console.log('Rate ajouté ou remplacé avec succès')),
    ).subscribe();
  }

}
