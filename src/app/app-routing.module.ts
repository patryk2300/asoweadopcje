import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { LoginComponent } from './login/login.component';
import { DescriptionComponent } from './description/description.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: '#', component: HomeComponent },
  { path: 'gallery', component: GalleryComponent },
  { path: 'gallery/:name', component: DescriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponent },
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
