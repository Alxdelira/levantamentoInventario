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
  senha: { type: String, required: true, select: false },
  ativo: { type: Boolean, default: false },
 
});

// Configurações do modelo para que seja usada para buscar dados de usuário de forma paginada em nossa aplicação
usuarioSchema.plugin(mongoosePaginate);

// Renomear a coleção do modelo
const usuario = mongoose.model('Usuario', usuarioSchema);

export default usuario;
