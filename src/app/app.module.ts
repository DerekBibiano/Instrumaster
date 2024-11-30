import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { ServiceWorkerModule } from '@angular/service-worker';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';  // Importa AngularFirestoreModule
import { CommonModule } from '@angular/common';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PrivacyPolicyModalComponent } from './privacy-policy-modal/privacy-policy-modal.component';
// import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [AppComponent, PrivacyPolicyModalComponent],
  imports: [
    BrowserModule,
    FormsModule,
    IonicModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    CommonModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    AngularFirestoreModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Agrega esto si usas Web Components
  exports: [PrivacyPolicyModalComponent],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
