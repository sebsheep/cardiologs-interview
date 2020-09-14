import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';

import { AppComponent } from './app.component';
//import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { TriageState } from './store/model.state';
import { DashboardComponent, ArrhythmiaSelectorComponent } from './dashboard/dashboard.component';
import { CardsComponent } from './cards/cards.component';
import { LoadingCardComponent, CardComponent, StatusButtonComponent, ArrhythmiaComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    CardsComponent,
    CardComponent,
    LoadingCardComponent,
    StatusButtonComponent,
    ArrhythmiaComponent,
    ArrhythmiaSelectorComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    LoggerModule.forRoot({
      serverLoggingUrl: '/api/logs',
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.ERROR,
    }),
    NgxsModule.forRoot([TriageState], { developmentMode: true }),
    HttpClientModule,
    //NgxsReduxDevtoolsPluginModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
