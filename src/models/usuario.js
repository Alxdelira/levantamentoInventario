import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';

const usuarioSchema = new mongoose.Schema({

  // Verificar se o Usuario será necessario ser unico.
  nome: { type: String, required: true, min: 6, max: 255 },
  // Testar Validade do e-mail com o validador.
  email: {
    type: String, required: true, unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'Endereço de e-mail inválido'
    }
  },
  // Verificar com o Cliente se será necessario numero minimo de caracteres para senha. Por padrão coloquei 8.
  senha: { type: String, required: true, select: false },
  ativo: { type: Boolean, default: false },
  // Colocar o Arquivo rotas.js no models posteriormente.
  rota: [{
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'rotas' },
    rota: { type: String, required: true, trim: true },
    verbo_get: { type: Boolean },
    verbo_put: { type: Boolean },
    verbo_patch: { type: Boolean },
    verbo_delete: { type: Boolean },
    verbo_post: { type: Boolean }
  }]
});

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(mongoosePaginate);

// Renomear a coleção do modelo
const usuario = mongoose.model('Usuario', usuarioSchema);

export default usuario;
