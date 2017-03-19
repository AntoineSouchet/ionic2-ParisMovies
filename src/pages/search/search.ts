import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from 'ionic-angular';
import { MapDetails } from '../mapDetails/mapDetails';
import { LoadingController } from 'ionic-angular';
import {CompleteTestService} from '../../services/complete-test';

declare var google;

@Component({
	selector: 'page-search', 
	templateUrl: 'search.html',
	providers : [CompleteTestService]
})
export class SearchPage {
	
	@ViewChild('searchbar') searchbar: any;
	//Public var
	public data;
	public dataLoaded;
	public listView;
	public loadingPopup;
	public reload = false;
	
	rootPage: any = SearchPage;

	constructor(public navCtrl: NavController, 
			public completeTestService: CompleteTestService, 
			public http: Http, 
			public loadingCtrl: LoadingController) {
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

		}, err => {
			console.log(err);
		});
		this.loadingPopup.dismiss();
	}

		//Load webservice off Paris
		load() {
			if (this.data) {
				if (this.reload == false) {
				// already loaded data
				console.log("data already loaded");
				this.reload = true;
				return Promise.resolve(this.dataLoaded);
				}
				else {
					console.log("return new promise");
					return new Promise(resolve => {
						var url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=tournagesdefilmsparis2011&q=titre%3D" + encodeURI(this.searchbar.getValue()) + "&facet=realisateur&facet=date_debut_evenement&facet=date_fin_evenement&facet=cadre&facet=lieu&facet=arrondissement";
						this.http.get(url)
						.map(res => res.json())
						.subscribe(data => {
							this.data = data;
							this.dataLoaded = data;
							resolve(this.data);
						});
				});
				}
			}
			else {
				console.log("return new promise");
				return new Promise(resolve => {
					var url = "https://opendata.paris.fr/api/records/1.0/search/?dataset=tournagesdefilmsparis2011&q=titre%3D" + encodeURI(this.searchbar.getValue()) + "&facet=realisateur&facet=date_debut_evenement&facet=date_fin_evenement&facet=cadre&facet=lieu&facet=arrondissement";
					this.http.get(url)
					.map(res => res.json())
					.subscribe(data => {
						this.data = data;
						this.dataLoaded = data;
						resolve(this.data);
					});
			});
		}
	}
		
	itemSelected(movie: string) {
		this.navCtrl.push(MapDetails, {
			myMovie: movie
		});
	}
}

