import { NgModule } from 'angular-ts-decorators';

import { PlanetService } from './shared/planet.service';
import { PlanetsComponent } from './planets.component';

@NgModule({
    id: 'PlanetsModule',
    imports: [],
    declarations: [
        PlanetsComponent
    ],
    providers: [
        PlanetService,
    ],
})
export class PlanetsModule { }
