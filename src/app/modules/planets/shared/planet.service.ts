import { IHttpService, IPromise, IQService } from 'angular';
import { Injectable } from 'angular-ts-decorators';
import { Planet } from './planet.model';
import { MessageService } from '../../../shared/services/message.service';

@Injectable('planetService')
export class PlanetService {
  private baseUrlAPI = 'https://swapi.dev/api';

  /*@ngInject*/
  constructor(
    private $http: IHttpService,
    private $q: IQService,
    private messageService: MessageService
  ) { }

  /** GET plalnets from the server */
  getPlanetApi(): IPromise<Planet> {
    const deferred = this.$q.defer<Planet>();
    const planetId = Math.floor(Math.random() * 60 + 1) || 1;
    const url = `${this.baseUrlAPI}/planets/${planetId}`;

    this.$http.get<Planet>(url)
      .then(response => {
        deferred.resolve(response.data)
      })
      .catch(error => {
        this.log(error);
        deferred.reject(error);
      });

    return deferred.promise;
  }


  /*Log a PlanetService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlanetService: ${message}`);
  }
}
