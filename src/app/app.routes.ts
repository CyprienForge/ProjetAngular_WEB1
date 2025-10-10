import { Routes } from '@angular/router';
import { App } from './app';
import { Accueil } from './components/accueil/accueil';
import { Login } from './components/login/login';
import { MovieDetails } from './components/movie-details/movie-details';
import { MovieForm } from './components/movie-form/movie-form';
import { Home } from './components/home/home';
import { ErrorPage } from './components/error/error';
import { Component } from '@angular/core';
import { Disconnect } from './components/disconnect/disconnect';
import { authGuardGuard } from './guard/auth-guard-guard';

export const routes: Routes = [
    { path: '', component: Login },
    { path: 'home', component: Home, canActivate: [authGuardGuard] },
    { path: 'accueil', component: Accueil, canActivate: [authGuardGuard] },
    { path: 'movies/:id', component: MovieDetails, canActivate: [authGuardGuard] },
    { path: 'add-movie', component: MovieForm, canActivate: [authGuardGuard] },
    { path: 'disconnect', component: Disconnect, canActivate: [authGuardGuard] },
    { path: '**', component: ErrorPage }
];
