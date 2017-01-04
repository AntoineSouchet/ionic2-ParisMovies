import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

declare var google;

@Component({
  selector: 'page-mapDetails',
  templateUrl: 'mapDetails.html'
})
export class MapDetails {
  public myMovie:any;
   public title;
   @ViewChild('map') mapElement: ElementRef;
  map: any;

constructor(public navCtrl: NavController, public navParams: NavParams){ 
  this.myMovie = navParams.get("myMovie");
}

 ionViewDidLoad(){
   console.log('Hello Other Page');
   console.log("Movie : " + this.myMovie);
   this.title = this.myMovie.fields.titre;
    this.loadMap();
  }


  loadMap(){
       console.log('Load Map');
    let latLng = new google.maps.LatLng(this.myMovie.fields.geo_coordinates[0], this.myMovie.fields.geo_coordinates[1]);
    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.addMarker();
  }

addMarker(){
 
  let marker = new google.maps.Marker({
    map: this.map,
    animation: google.maps.Animation.DROP,
    position: this.map.getCenter()
  });
 
  let content = "<h5>" + this.myMovie.fields.titre + "</h5><br / >" + this.myMovie.fields.adresse_complete
 
  this.addInfoWindow(marker, content);
 
}

addInfoWindow(marker, content){
 
  let infoWindow = new google.maps.InfoWindow({
    content: content
  });
 
  google.maps.event.addListener(marker, 'click', () => {
    infoWindow.open(this.map, marker);
  });
 
}

}
