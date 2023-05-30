import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const inventarioSchema = new mongoose.Schema(
    {
        setor: { type: mongoose.Schema.Types.ObjectId, ref: 'setor', required: true },
        itens:
            [
                {
                    _id: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'item',

                    }
                }
            ],
        criadoEm: { type: Date, default: Date.now },
    }
);

inventarioSchema.plugin(mongoosePaginate);

const inventario = mongoose.model('inventario', inventarioSchema);

export default inventario;