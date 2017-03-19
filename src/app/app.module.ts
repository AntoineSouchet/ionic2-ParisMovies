import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';
import { AboutPage } from '../pages/about/about';
import { MapDetails } from '../pages/mapDetails/mapDetails';

import { AUTOCOMPLETE_DIRECTIVES, AUTOCOMPLETE_PIPES } from 'ionic2-auto-complete'; 

import {CompleteTestService} from '../services/complete-test';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    SearchPage,
    MapDetails,
    AboutPage,
    AUTOCOMPLETE_DIRECTIVES,
    AUTOCOMPLETE_PIPES
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SearchPage,
    MapDetails,
    AboutPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, CompleteTestService]
})
export class AppModule {}
