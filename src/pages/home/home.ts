import { Component, ViewChild, ElementRef } from '@angular/core';
import { Geolocation } from 'ionic-native';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import { MapDetails } from '../mapDetails/mapDetails';
import { LoadingController } from 'ionic-angular';

import { Toast } from 'ionic-native';

declare var google;


@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {
	//Public var
	public data;
	public dataLoaded;
	
	public recordLong;
	public recordLat;
	
	public totalNear;
	public listView;

	public loadingPopup;
	
	rootPage: any = HomePage;

	constructor(public navCtrl: NavController,public http: Http, public loadingCtrl: LoadingController) {
		this.navCtrl = navCtrl;
	}
	/*
	* Search function from Button on home.html
		@Params : none
		@Return : Geoposition with GPS phone
	*/
	search() {
		console.log("Launch search");
		this.loadingPopup = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: false
		});

		this.loadingPopup.present();
		var lat = 0;
		var long = 0;
		//Get current position
		Geolocation.getCurrentPosition().then(pos => {
			lat = pos.coords.latitude;
			long = pos.coords.longitude;
		});

	this.load().then(data => {
		console.log("load data");

		this.data = data.records;
		var totalNear = data.nhits;
		console.log(this.data);
		console.log(data.nhits);

		if (totalNear == 0) {
			this.totalNear = "No movie found nears you, are you in Paris ?";
		} else if (totalNear == 1) {
			this.totalNear = "One film nears you.";
		} else {
			this.totalNear = "The ten movies nears to you."
		}
	}, err => {
		this.totalNear = "Error, can not load movies or your position";
		console.log(err);
	});
	this.loadingPopup.dismiss();
}

	//Load webservice off Paris
	load() {
		if (this.data) {
			// already loaded data
			console.log("data already loaded");
			return Promise.resolve(this.dataLoaded);
		}
		else {
			console.log("return new promise");
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
					this.dataLoaded = data;
					//Record long and lat to laucnh promise again if necessary...
					this.recordLong = "";
					resolve(this.data);
				});
		});
	}
}

	//Select item into the ListView
	itemSelected(movie: string) {
		this.navCtrl.push(MapDetails, {
			myMovie: movie
		});
	}
}
