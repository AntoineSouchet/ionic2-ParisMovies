import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";

@Injectable()
export class CompleteTestService implements AutoCompleteService {
  labelAttribute = "fields";

  constructor(private http:Http) {

  }
  getResults(keyword:string) {
    return this.http.get("https://opendata.paris.fr/api/records/1.0/search/?dataset=tournagesdefilmsparis2011&facet=titre&rows=1000")
      .map(
        result =>
        {
          return result.json().records
            .filter(item => item.fields.titre.toLowerCase().startsWith(keyword.toLowerCase()) )
        });
  }
}