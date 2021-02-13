import { Component, OnInit } from 'angular-ts-decorators';
const  imageStarWars = require('./../../../assets/images/start-banner.png');

@Component({
  selector: 'app-start',
  template: require('./start.component.html'),
  styles: [require('./start.component.scss')]
})
export class StartComponent implements OnInit {
  startWarsBanner = imageStarWars;
/*@ngInject*/
constructor() {

}

ngOnInit() {

}
}
