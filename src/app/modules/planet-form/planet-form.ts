
import { Component, OnInit } from 'angular-ts-decorators';
import { Planet } from '../planets/shared/planet.model';
import { PlanetService } from '../planets/shared/planet.service';

@Component({
    selector: 'app-heroes',
    template: require('./planet-form.html'),
    styles: [require('./planet-form.scss')]
})
export class PlanetsForm implements OnInit {
    planets: any;
    planet: Planet;
    name =  true;
    /*@ngInject*/
    constructor(private planetService: PlanetService) {

    }

    ngOnInit() {
        this.getPlanet();
    }

    getPlanet() {
        this.planetService.getPlanet()
            .then(planets => console.log(planets));
    }
    searchById(id) {
        this.planetService.getPlanetById(id)
            .then(planet => console.log(planet));
    }

    searchByName(name) {
        this.planetService.searchPlanets(name)
            .then(planet => console.log(planet));
    }

    add(name: string, climate: string, terrain: string) {
        this.planetService.addPlanet(name, climate, terrain);
    }
}
