import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const itemSchema = new mongoose.Schema({

  etiqueta: {
    type: Number,
    unique: true,
    required: false
  },

  naoEtiquetado: {
    type: Boolean,
    default: false
  },

  encontrado: {
    type: Boolean,
    default: false
  },

  
  nome: {
    type: String,
    required: true,
    
  },
  
  setor: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'setor' }
  },

  estado: {
    type: String
  },

  ativo: {
    type: Boolean,
    default: true
  },

  descricao: {
    type: String
  },

  responsavel: {
    type: String,
    required: true
  },

  image: {
    type: String
  }

});

itemSchema.plugin(mongoosePaginate);


const item = mongoose.model('item', itemSchema);

export default item;
