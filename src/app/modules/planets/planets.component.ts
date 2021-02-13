import { Component, OnInit } from 'angular-ts-decorators';
import { Planet } from './shared/planet.model';
import { PlanetService } from './shared/planet.service';

@Component({
  selector: 'app-planets',
  template: require('./planets.component.html'),
  styles: [require('./planets.component.scss')]
})
export class PlanetsComponent implements OnInit {
  planet: Planet;
  isLoading = true;
  /*@ngInject*/
  constructor(private planetService: PlanetService) {

  }

  ngOnInit() {
    this.getPlanets();
  }

  getPlanets() {
    this.isLoading = true;
    this.planetService.getPlanetApi()
      .then(planet => {
        this.planet = planet;
        this.isLoading = false;
      })
      .catch(error => {
        console.error(error);
        this.isLoading = false;
      });
  }
}
