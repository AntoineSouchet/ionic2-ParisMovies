import { Component } from '@angular/core';
import {Geolocation} from 'ionic-native';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { MapPage } from '../map/map';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = MapPage;

  constructor() {

  }
}