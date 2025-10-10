import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-disconnect',
  imports: [],
  templateUrl: './disconnect.html',
  styleUrl: './disconnect.css'
})
export class Disconnect {
  private router = inject(Router)

  constructor(
    private localStorageService:LocalStorageService
  ){}

  ngOnInit(){
    this.localStorageService.disconnect()
    this.router.navigate(['/'])
  }

}
