import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NgModule } from 'angular-ts-decorators';
import './styles.css';
import { SharedModule } from './shared/shared.module';
import { PlanetsModule } from './modules/planets/planets.module';
import { StartModule } from './modules/start/start.module';

@NgModule({
  id: 'AppModule',
  imports: [
    AppRoutingModule,
    SharedModule,
    PlanetsModule,
    StartModule
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
