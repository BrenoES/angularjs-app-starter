import { NgModule } from 'angular-ts-decorators';

import { PlanetService } from './shared/planet.service';
import { PlanetsComponent } from './planets.component';

@NgModule({
    id: PlanetsModule.name,
    imports: [],
    declarations: [
        PlanetsComponent
    ],
    providers: [
        PlanetService,
    ],
})
export class PlanetsModule { }
