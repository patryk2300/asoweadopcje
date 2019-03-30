import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { GalleryComponent } from './gallery/gallery.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DescriptionComponent } from './description/description.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { FooterComponent } from './footer/footer.component';
import { ManageGalleryCardComponent } from './manage-gallery-card/manage-gallery-card.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


import { FileDropDirective } from './file-drop.directive';
import { HomeBannerUploadComponent } from './home-banner-upload/home-banner-upload.component';
import { NewsComponent } from './news/news.component';
import { ContactComponent } from './contact/contact.component';
import { NewsUploadComponent } from './news-upload/news-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    PageNotFoundComponent,
    GalleryComponent,
    LoginComponent,
    DescriptionComponent,
    FileUploadComponent,
    AdminPanelComponent,
    ManageGalleryCardComponent,
    FileDropDirective,
    ScheduleComponent,
    FooterComponent,
    HomeBannerUploadComponent,
    NewsComponent,
    ContactComponent,
    NewsUploadComponent,
  ],
  imports: [
    [
      FormsModule,
      BrowserModule,
      AppRoutingModule,
      AngularFirestoreModule,
      AngularFireStorageModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireDatabaseModule,
      AngularFireAuthModule,
      BrowserAnimationsModule,
      ReactiveFormsModule,
      NgbModule.forRoot(),
      NgxMaterialTimepickerModule,
      LeafletModule.forRoot()
    ]
  ],
  providers: [FileDropDirective],
  bootstrap: [AppComponent],
  entryComponents: [
    ManageGalleryCardComponent,
    HomeBannerUploadComponent,
    NewsUploadComponent
  ]
})
export class AppModule { }
