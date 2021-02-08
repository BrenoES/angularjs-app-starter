"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var angular_ts_decorators_1 = require("angular-ts-decorators");
var AppComponent = /** @class */ (function () {
    //@ts-ignore
    function AppComponent($state) {
        this.$state = $state;
        this.title = 'Planets Star Wars';
    }
    AppComponent = __decorate([
        angular_ts_decorators_1.Component({
            selector: 'app-root',
            template: require('./app.component.html'),
            styles: [require('./app.component.scss')]
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
