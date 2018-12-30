import { Component, Input, OnInit } from '@angular/core';
import { AnyHelp } from '@app/core/help/help.model';

@Component({
  selector: 'sf-service-card',
  templateUrl: './service-card.component.html',
  styleUrls: ['./service-card.component.scss']
})
export class ServiceCardComponent implements OnInit {

  @Input() help: AnyHelp;
  constructor() { }

  ngOnInit() {
  }

}
