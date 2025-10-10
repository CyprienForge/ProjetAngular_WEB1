import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage-service';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService)
  const router = inject(Router)
  if(localStorageService.isConnected()){
    return true
  }
  else{
    router.navigate(['/error'])
    return false;
  }
};
