import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { PlanetsComponent } from './modules/planets/planets.component';
import { PlanetService } from './modules/planets/shared/planet.service';
import { MessageService } from './shared/services/message.service';
import { NgModule } from 'angular-ts-decorators';
import './styles.css';
import { StartComponent } from './modules/start/start.component';

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    PlanetsComponent,
    StartComponent
  ],
  providers: [
    PlanetService,
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
