import { IHttpService, IPromise, IQService } from 'angular';
import { Injectable } from 'angular-ts-decorators';
import { Planet } from './planet.model';
import { MessageService } from '../../../shared/services/message.service';

@Injectable('planetService')
export class PlanetService {
  private planets: Planet[] = [];
  private planetsApi: Planet[] = [];
  private planetUrl = 'http://localhost:3001/planets/';

  private planetApiUrl = 'https://swapi.co/api/planets/?page=1';

  /*@ngInject*/
  constructor(
    private $http: IHttpService,
    private $q: IQService,
    private messageService: MessageService
  ) { }

  /** GET plalnets from the server */
  getPlanetApi(): IPromise<any[]> {
    const deferred = this.$q.defer<any[]>();

    this.$http.get<any>(this.planetApiUrl).then(response => {
      const pageIndex = (response) ? Math.floor(Math.random() * 6 + 1) : 1;
      this.log('fetched planets');
      this.planets = response.data.results;
      this.planetApiUrl = `https://swapi.co/api/planets/?page=${pageIndex}`;
      this.getPlanetApi();
      deferred.resolve(this.planets);

    }, error => {
      this.log(error);
      deferred.reject(error);
    });

    return deferred.promise;
  }

  getPlanet(): IPromise<any[]> {
    const deferred = this.$q.defer<any[]>();

    this.$http.get<any>(this.planetUrl).then(response => {
      this.planetsApi = response.data;
      deferred.resolve(this.planetsApi);

    }, error => {
      this.log(error);
      deferred.reject(error);
    });

    return deferred.promise;
  }

  /** GET Planet by id */
  getPlanetById(id: number): IPromise<Planet> {
    const deferred = this.$q.defer<Planet>();
    const planet = this.planetsApi['docs'].find(p => p._id === id);
    if (planet) {
      deferred.resolve(planet);
    } else {
      const error = `planet with id=${id} not found`;
      this.log(error);
      deferred.reject(error);
    }
    return deferred.promise;
  }

  /* GET planets whose name contains search term */
  searchPlanets(term: string): IPromise<Planet[]> {
    const deferred = this.$q.defer<Planet[]>();
    const error = `no planets with name that contains ${term}`;
    if (!term.trim()) {
      this.log(error);
      deferred.resolve([]);
    }

    const planets = this.planetsApi['docs'].filter(planet => planet.name && planet.name.includes(term));

    this.log(`found ${planets.length} planets whose name contains ${term}`);
    deferred.resolve(planets);
    return deferred.promise;
  }

  // //////// Save methods //////////

  /** POST: add a new planet to the server */
  addPlanet(name: string, terrain: string, climate: string): void {
    const deferred = this.$q.defer<Planet>();
    const planet = { name, terrain, climate };
    console.log('added new planet');
    deferred.resolve(planet);
    this.$http({
      url: this.planetUrl,
      method: 'POST',
      data: JSON.stringify(planet),
      headers: {
        'Content-Type': 'application/json'
      },
    });
  }

  /*Log a PlanetService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlanetService: ${message}`);
  }
}
