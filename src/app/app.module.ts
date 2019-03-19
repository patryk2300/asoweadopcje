import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GalleryComponent } from './gallery/gallery.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { DescriptionComponent } from './description/description.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ManageGalleryCardComponent } from './manage-gallery-card/manage-gallery-card.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FileDropDirective } from './file-drop.directive';
import { DisplayImageDirective } from './display-image.directive';
import { ScheduleComponent } from './schedule/schedule.component';
import { FooterComponent } from './footer/footer.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';


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
    DisplayImageDirective,
    ScheduleComponent,
    FooterComponent,
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
    ]
  ],
  providers: [FileDropDirective, DisplayImageDirective],
  bootstrap: [AppComponent],
  entryComponents: [
    ManageGalleryCardComponent
  ]
})
export class AppModule { }
