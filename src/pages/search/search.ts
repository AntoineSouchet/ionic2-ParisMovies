import { Component } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController, NavParams } from 'ionic-angular';
import { MapDetails } from '../mapDetails/mapDetails';
import { LoadingController } from 'ionic-angular';

@Component({
	selector: 'page-search',
	templateUrl: 'search.html'
})
export class SearchPage {
	
	//Public var
	public data;
	public dataLoaded;
	
	public recordLong;
	public recordLat;
	
	public totalNear;
	public listView;

	public loadingPopup;
	
	rootPage: any = SearchPage;

	constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
		this.navCtrl = navCtrl;
	}
	
	
	search() {
		console.log("Launch search");
		this.loadingPopup = this.loadingCtrl.create({
			content: 'Please wait...',
			dismissOnPageChange: false
		});

		this.loadingPopup.present();
		this.load().then(data => {
			console.log("load data");

			this.data = data.records;
			var totalNear = data.nhits;
			console.log(this.data);
			console.log(data.nhits);

		}, err => {
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
					var url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=tournagesdefilmsparis2011&q=titre%3DLES+INVITES+DE+MON+PERE&facet=realisateur&facet=date_debut_evenement&facet=date_fin_evenement&facet=cadre&facet=lieu&facet=arrondissement";
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

