import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import {
  LAZY_MAPS_API_CONFIG,
  YaMapsAPILoaderConfigLiteral,
} from './services/ya-maps-loader';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var ymaps: any;

@Injectable({
  providedIn: 'root',
})
export class YamapngService {
  private config: YaMapsAPILoaderConfigLiteral;
  private url: string;
  private suggestView: any;

  constructor(
    @Optional() @Inject(LAZY_MAPS_API_CONFIG) config: any = null,
    private http: HttpClient
  ) {
    this.config = config;
    this.url = `https://geocode-maps.yandex.ru/1.x/?apikey=${
      this.config.apiKey
    }&format=json&`;
  }

  getAdressFromCoords(lat, lng) {
    return this.http.get(this.url + 'geocode=' + lng + `,` + lat);
  }

  getCoordsFromAdress(adress) {
    return this.http.get(this.url + 'geocode=' + adress);
  }

  public createSuggest(el: HTMLElement | string, opt?: any): Promise<void> {
    this.suggestView = new ymaps.SuggestView(el, opt);
    return this.suggestView;
  }

  public parseAutoComplite() {
    const arrStr: any[] = this.suggestView.state.get('items');
    arrStr.forEach(element => {
      console.log(element);
      element.displayName = element.displayName + '123';
    });
    this.suggestView.state.set('items', arrStr);
  }

  public getSuggests(request: string, opt?: Object) {
    return ymaps.suggest(request, opt);
  }
}
