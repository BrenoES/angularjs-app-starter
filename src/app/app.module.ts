
import { NgModule } from 'angular-ts-decorators';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlanetsComponent } from './planets/planets.component';
import { MessageService } from './services/message.service';
import { PlanetService } from './services/planet.service';

import './styles.css';

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PlanetsComponent
  ],
  providers: [
    PlanetService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
