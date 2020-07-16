import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, icon } from 'leaflet';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import { UserState } from '@app/core';
import { DEFAULT_LOCATION } from 'assets/data/appConsts';

@Component({
  selector: 'sf-help-map',
  templateUrl: './help-map.component.html',
  styleUrls: ['./help-map.component.scss']
})
export class HelpMapComponent implements OnInit, AfterViewInit {
  @Input() helps: Object;

  mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {  })
    ],
    zoom: 15,
    center: latLng(DEFAULT_LOCATION.x, DEFAULT_LOCATION.y)
  };

  mapLayers = [];

  constructor(private store: Store<any>) { }


  ngOnInit(): void {
    this.store.select('user').pipe(take(1)).subscribe(
      (user: UserState) => {
          if (user.user.location && user.user.location.coordinates) {
            this.mapOptions.center = latLng(user.user.location.coordinates.x, user.user.location.coordinates.y)

          }
      }
  );
    this.mapLayers = Object.values(this.helps).map(
      help => marker(
        [help[0].sender.location.coordinates.x, help[0].sender.location.coordinates.y],
        {
          icon: icon(
            {
              iconUrl: 'assets/img/genericPin.svg',
              iconSize: [40, 48],
              iconAnchor: [20, 48]
            }
          )
        }
      )
    )
  }

  ngAfterViewInit(): void {
  }

  onMapReady(map: L.Map) {
    console.log('map')
    setTimeout(() => {
      map.invalidateSize();
    }, 3000);
  }

}
