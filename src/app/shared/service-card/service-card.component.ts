import { Component, Input, OnInit } from '@angular/core';
import { AnyHelp } from '@app/core/help/help.model';
import { tileLayer, latLng, icon, marker } from 'leaflet';

@Component({
  selector: 'sf-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {
  @Input() userRegistered: boolean = false;
  @Input() showHost: boolean =false;
  @Input() help: AnyHelp;
  constructor() { }
  readonly mapOptions = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {})
    ],
    zoom: 15,
    center: latLng(0, 0)
  };
  readonly mapLayers = [];
  ngOnInit() {
    this.mapOptions.center = latLng(this.help.sender.location.coordinates.x, this.help.sender.location.coordinates.y);
    this.mapLayers.push(marker(
      [this.help.sender.location.coordinates.x, this.help.sender.location.coordinates.y],
      {
        icon: icon(
          {
            iconUrl: 'assets/img/genericPin.svg',
            iconSize: [40, 48],
            iconAnchor: [20, 48]
          }
        )
      })
    )
  }


}
