import { Component, ViewChild, ElementRef } from '@angular/core';
import {Geolocation} from 'ionic-native';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
declare var google;

@Component({
  templateUrl: 'mapHome.html'
})

export class MapXPage {
  item;


   @ViewChild('map') mapElement: ElementRef;
   map: any;

  constructor(params: NavParams) {
    this.item = params.data.item;

  }
}

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public data;
   public totalNear;
   public listView;


   constructor(public navCtrl: NavController,public http: Http) { }

  search() {
    console.log("Launch search");
    var lat = 0;
    var long = 0;
    //Get current position
    Geolocation.getCurrentPosition().then(pos => {
      lat = pos.coords.latitude;
      var long = pos.coords.longitude;
    });
  this.load()
    .then(data => {
      this.data = data.records;
      var totalNear = data.nhits;
        if (totalNear == 0) {
          this.totalNear = "No movie found near your, are you in Paris ?";
        } else if (totalNear == 1) {
          this.totalNear = "One film near you.";
        } else {
         this.totalNear = totalNear + " movies near to you."
        }
    });
  }

//Load webservice
  load() {
  if (this.data) {
    // already loaded data
    return Promise.resolve(this.data);
  }

  // don't have the data yet
  return new Promise(resolve => {
    // We're using Angular HTTP provider to request the data,
    // then on the response, it'll map the JSON data to a parsed JS object.
    // Next, we process the data and resolve the promise with the new data.
    var url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=tournagesdefilmsparis2011&facet=realisateur&facet=date_debut_evenement&facet=date_fin_evenement&facet=cadre&facet=lieu&facet=arrondissement&geofilter.distance=48.870502,2.304897,1000";
    this.http.get(url)
      .map(res => res.json())
      .subscribe(data => {
        // we've got back the raw data, now generate the core schedule data
        // and save the data for later reference
        this.data = data;
        resolve(this.data);
      });
  });
}

  itemSelected(movie: string) {
    this.navCtrl.push(MapXPage);
  }

}
