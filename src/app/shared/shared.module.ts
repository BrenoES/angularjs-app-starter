import { NgModule } from 'angular-ts-decorators';
import { ButtonComponent } from './components/button/button.component';
import { MessageService } from './services/message.service';

@NgModule({
    id: SharedModule.name,
    imports: [],
    declarations: [
        ButtonComponent
    ],
    providers: [
        MessageService,
    ],
})
export class SharedModule { }
