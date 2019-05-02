
import { PlanetsController } from '../controller/planet.controller';

const pController = new PlanetsController();

export class Routes {

    public routes(routers) {

        routers.get('/planets', pController.index);
        routers.get('/planets/:id', pController.show);
        routers.post('/planets', pController.store);
        routers.put('/planets/:id', pController.update);
        routers.delete('/planets/:id', pController.destroy);
    }
}

