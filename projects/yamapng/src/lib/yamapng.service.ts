import { Inject, Injectable, InjectionToken, Optional } from '@angular/core';
import { LAZY_MAPS_API_CONFIG, YaMapsAPILoaderConfigLiteral } from './services/ya-maps-loader';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class YamapngService {
  private config: YaMapsAPILoaderConfigLiteral;
  private url: string;

  constructor(@Optional() @Inject(LAZY_MAPS_API_CONFIG) config: any = null, private http: HttpClient) {
    this.config = config;
    this.url = `https://geocode-maps.yandex.ru/1.x/?apikey=${this.config.apiKey}&format=json&`;
  }

  getAdressFromCoords(lat, lng) {
    return this.http.get(this.url + 'geocode=' + lng + `,` + lat);
  }

  getCoordsFromAdress(adress) {
    return this.http.get(this.url + 'geocode=' + adress);
  }
}
