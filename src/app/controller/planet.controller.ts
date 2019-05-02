
import mongoose from 'mongoose';
import { PlanetSchema } from '../model/planet_model';

const Planet = mongoose.model('Planet', PlanetSchema);

export class PlanetsController {

    public async index(req, res) {
        const { page = 1 } = req.query;
        const Planets = await Planet.paginate({}, { page, limit: 10 });
        console.log(Planets);
        return res.json(Planets);
    }

    public async show(req, res) {
        const Planets = await Planet.findById(req.params.id);

        return res.json(Planets);
    }

    public async store(req, res) {

        const Planets = await Planet.create(req.body);
        console.log(Planets, req);

        return res.json(Planets);
    }

    public async update(req, res) {
        const Planets = await Planet.findByIdAndUpdate(req.params.id, req.body, { new: true });

        return res.json(Planets);
    }

    public async destroy(req, res) {
        await Planet.findByIdAndRemove(req.params.id);

        return res.send();
    }
}
