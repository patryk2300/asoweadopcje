import { Component, OnInit } from '@angular/core';
import { tileLayer, latLng, circle, polygon, marker, Marker } from 'leaflet';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  showLayer: boolean = true;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 18,
    center: latLng(52.156527, 20.962083)
  };

  marker: Marker<any>;

  constructor() { }

  ngOnInit() {
    this.marker = marker([52.156527, 20.962083]);
  }

}
