import { Schema } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

export const PlanetSchema: Schema = new Schema({
    name: {
        type: String,
        required: true

    },
    terrain: {
        type: String,
        required: true

    },
    climate: {
        type: String,
        required: true

    },
    creatAt: {
        type: Date,
        default: Date.now
    },
});

PlanetSchema.plugin(mongoosePaginate);
