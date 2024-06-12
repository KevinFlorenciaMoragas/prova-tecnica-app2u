import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';
import { NavigationComponent } from './navigation/navigation.component';
import { DetailComponent } from './detail/detail.component';
import { FooterComponent } from './footer/footer.component';
import { dbConfig } from './db/indexed-db.config';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    NavigationComponent,
    DetailComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
