
import { Component, OnInit } from 'angular-ts-decorators';
import { Planet } from '../planet';
import { PlanetService } from '../services/planet.service';

@Component({
    selector: 'app-heroes',
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
        this.getPlanet()
    }

    getPlanet() {
        this.planetService.getPlanet()
            .then(planets => console.log(planets));
    }
    searchById(id){
        this.planetService.getPlanetById(id)
            .then(planet => console.log(planet))
    }

    searchByName(name){
        this.planetService.searchPlanets(name)
            .then(planet => console.log(planet))
    }

    add(name: string, climate: string, terrain: string) {
        this.planetService.addPlanet(name, climate, terrain);
    }
}