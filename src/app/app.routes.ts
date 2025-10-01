import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './components/accueil/accueil';
import { Login } from './components/login/login';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieForm } from './components/movie-form/movie-form';
import { Home } from './components/home/home';
import { ErrorPage } from './components/error/error';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home },
    { path: 'accueil', component: Accueil },
    { path: 'movies/:id', component: MovieDetails },
    { path: 'add-movie', component: MovieForm },
    { path: '**', component: ErrorPage }
];
