import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChiSiamoComponent } from './chi-siamo/chi-siamo.component';
import { ListaCorsiComponent } from './lista-corsi/lista-corsi.component';
import { AdminComponent } from './admin/admin.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: ChiSiamoComponent },
  { path: 'courses', component: ListaCorsiComponent },
  { path: 'admin', component: AdminComponent },
  { path: '**', component: HomeComponent },
];
