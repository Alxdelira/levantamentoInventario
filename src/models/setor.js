import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const setorSchema = new mongoose.Schema(
    {
        nome: { type: String, min: 8, max: 255, required: true },
        bloco: { type: String, required: true },
        ativo: { type: Boolean, default: false }

    }
);

setorSchema.plugin(mongoosePaginate);

const setor = mongoose.model('setor', setorSchema);

export default setor;
