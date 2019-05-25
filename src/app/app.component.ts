import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MapClickMouseEvent,
  YamapngService,
} from 'projects/yamapng/src/public_api';

import {
  CreateNewAutocompleteGroup,
  SelectedAutocompleteItem,
  NgAutoCompleteComponent,
} from 'ng-auto-complete';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl'],
})
export class AppComponent implements OnInit {
  @ViewChild(NgAutoCompleteComponent) public completer: NgAutoCompleteComponent;

  title = 'ymapng';

  markers: any[] = [
    {
      id: 0,
      src: 'https://www.tsum.ru/local/gulp/dist/assets/images/logo.svg',
      name: 'ЦУМ',
      lat: 55.847,
      lng: 38.6,
      balloonHeader: '22U',
      balloonBody: `<img class="page_avatar_img"
                      src="https://www.tsum.ru/local/gulp/dist/assets/images/logo.svg"
                      alt="Tsum" width="200" height="200">`,
      balloonFooter: 'Footette',
      draggable: true,
      preset: 'islands#violetStretchyIcon',
      iconContent: 'Move me!!!',
      showInfo: false,
    },
    {
      id: 1,
      src:
        'http://project-volna.ru/wp-content/uploads/udf_foundry/images/logo.png',
      name: 'Volna',
      lat: 55.847,
      lng: 37.6,
      balloonHeader: '22U',
      balloonBody: `<img class="page_avatar_img"
                      src="http://project-volna.ru/wp-content/uploads/udf_foundry/images/logo.png"
                      alt="Volna" width="200" height="200">`,
      balloonFooter: 'Footette',
      draggable: true,
      preset: 'islands#blueSportIcon',
      showInfo: false,
    },
    {
      id: 2,
      src: 'http://caviarclothes.ru/wp-content/uploads/2013/06/mini-logo1.png',
      name: 'Caviarclothes',
      lat: 55.547,
      lng: 37.2,
      balloonHeader: '22U',
      balloonBody: `<img class="page_avatar_img"
                      src="http://caviarclothes.ru/wp-content/uploads/2013/06/mini-logo1.png"
                      width="200" height="200">`,
      balloonFooter: 'Footette',
      draggable: true,
      preset: 'islands#oliveStretchyIcon',
      showInfo: false,
    },
    {
      id: 3,
      src: 'http://rodinastore.ru/wp-content/themes/rodina/images/logo.png',
      name: 'Rodina',
      lat: 55.247,
      lng: 35.2,
      balloonHeader: '22U',
      balloonBody: `<img class="page_avatar_img"
                      src="http://rodinastore.ru/wp-content/themes/rodina/images/logo.png"
                      width="200" height="200">`,
      balloonFooter: 'Footette',
      draggable: true,
      preset: 'islands#blueSportIcon',
      showInfo: false,
    },
    {
      id: 4,
      src: 'https://brandshop.ru/catalog/view/theme/default/i/logo-white.png',
      name: 'Brandshop',
      lat: 55.347,
      lng: 37.0,
      balloonHeader: '22U',
      balloonBody: `<img class="page_avatar_img"
                      src="https://brandshop.ru/catalog/view/theme/default/i/logo-white.png"
                      width="200" height="200">`,
      balloonFooter: 'Footette',
      draggable: true,
      preset: 'islands#oliveStretchyIcon',
      showInfo: false,
    },
  ];

  public group = [
    CreateNewAutocompleteGroup(
      'Search / choose in / from list',
      'completer',
      [
        { title: 'Москва', id: '1' },
        { title: 'Option 2', id: '2' },
        { title: 'Option 3', id: '3' },
        { title: 'Option 4', id: '4' },
        { title: 'Option 5', id: '5' },
      ],
      { titleKey: 'title', childrenKey: null }
    ),
  ];

  constructor(private geocoder: YamapngService) {}

  ngOnInit(): void {}

  markerClick($event: MapClickMouseEvent) {
    const lat = $event.lat;
    const lng = $event.lng;
    console.log(lat, lng);

    this.geocoder.createSuggest('suggest');

    this.geocoder.getAddressFromCoords(lat, lng).subscribe((data: any) => {
      console.log(
        data.response.GeoObjectCollection.featureMember[0].GeoObject
          .description,
        data.response.GeoObjectCollection.featureMember[0].GeoObject.name
      );
    });
  }

  modelChanged(obj) {
    console.log(1111);
  }

  selected(item: SelectedAutocompleteItem) {
    this.geocoder.getSuggests(item.item.title).then((elem: any[]) => {
      const temp = [];
      elem.forEach(e => {
        temp.push(e.displayName);
      });
      console.log(temp);
    });
    // console.log(item.item.title);
  }
}
