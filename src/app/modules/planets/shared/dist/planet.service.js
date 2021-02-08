"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlanetService = void 0;
var angular_ts_decorators_1 = require("angular-ts-decorators");
var PlanetService = /** @class */ (function () {
    /*@ngInject*/
    function PlanetService($http, $q, messageService) {
        this.$http = $http;
        this.$q = $q;
        this.messageService = messageService;
        this.planets = [];
        this.planetsApi = [];
        this.planetApiUrl = 'https://swapi.dev/api/planets/';
    }
    /** GET plalnets from the server */
    PlanetService.prototype.getPlanetApi = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.$http.get(this.planetApiUrl).then(function (response) {
            var pageIndex = (response) ? Math.floor(Math.random() * 6 + 1) : 1;
            _this.log('fetched planets');
            _this.planets = response.data.results;
            _this.planetApiUrl = "https://swapi.dev/api/planets/?page=" + pageIndex;
            _this.getPlanetApi();
            deferred.resolve(_this.planets);
        }, function (error) {
            _this.log(error);
            deferred.reject(error);
        });
        return deferred.promise;
    };
    PlanetService.prototype.getPlanet = function () {
        var _this = this;
        var deferred = this.$q.defer();
        this.$http.get(this.planetApiUrl).then(function (response) {
            _this.planetsApi = response.data;
            deferred.resolve(_this.planetsApi);
        }, function (error) {
            _this.log(error);
            deferred.reject(error);
        });
        return deferred.promise;
    };
    /** GET Planet by id */
    PlanetService.prototype.getPlanetById = function (id) {
        var deferred = this.$q.defer();
        var planet = this.planetsApi['docs'].find(function (p) { return p._id === id; });
        if (planet) {
            deferred.resolve(planet);
        }
        else {
            var error = "planet with id=" + id + " not found";
            this.log(error);
            deferred.reject(error);
        }
        return deferred.promise;
    };
    /* GET planets whose name contains search term */
    PlanetService.prototype.searchPlanets = function (term) {
        var deferred = this.$q.defer();
        var error = "no planets with name that contains " + term;
        if (!term.trim()) {
            this.log(error);
            deferred.resolve([]);
        }
        var planets = this.planetsApi['docs'].filter(function (planet) { return planet.name && planet.name.includes(term); });
        this.log("found " + planets.length + " planets whose name contains " + term);
        deferred.resolve(planets);
        return deferred.promise;
    };
    // //////// Save methods //////////
    /** POST: add a new planet to the server */
    PlanetService.prototype.addPlanet = function (name, terrain, climate) {
        var deferred = this.$q.defer();
        var planet = { name: name, terrain: terrain, climate: climate };
        console.log('added new planet');
        deferred.resolve(planet);
        this.$http({
            url: this.planetApiUrl,
            method: 'POST',
            data: JSON.stringify(planet),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    };
    /*Log a PlanetService message with the MessageService */
    PlanetService.prototype.log = function (message) {
        this.messageService.add("PlanetService: " + message);
    };
    PlanetService = __decorate([
        angular_ts_decorators_1.Injectable('planetService')
    ], PlanetService);
    return PlanetService;
}());
exports.PlanetService = PlanetService;
