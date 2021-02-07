import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlanetsComponent } from './modules/planets/planets.component';
import { PlanetsForm } from './modules/planet-form/planet-form';
import { PlanetService } from './modules/planets/shared/planet.service';
import { MessageService } from './shared/services/message.service';
import { NgModule } from 'angular-ts-decorators';
import './styles.css';

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PlanetsComponent,
    PlanetsForm
  ],
  providers: [
    PlanetService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
