import { Component, OnInit } from 'angular-ts-decorators';
import { Planet } from './shared/planet.model';
import { PlanetService } from './shared/planet.service';

@Component({
  selector: 'app-planets',
  template: require('./planets.component.html'),
  styles: [require('./planets.component.scss')]
})
export class PlanetsComponent implements OnInit {
  planets: any;
  planet: Planet;
  /*@ngInject*/
  constructor(private planetService: PlanetService) {

  }

  ngOnInit() {
    this.initPlanets();
    this.planetService.getPlanet();
  }

  initPlanets(): void {
    this.planetService.getPlanetApi()
      .then((planets: Planet[]) => {
        this.planets = planets;
        this.planet = this.planets[0];
      });
  }

  getPlanets() {
    if (this.planets) {
      const index = Math.floor(Math.random() * this.planets.length);
      this.planet = this.planets[index];
      this.planetService.getPlanetApi().then(planets => this.planets = planets);
    }

  }

}
