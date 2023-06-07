import usuario from "../models/usuario.js";

// valiidar se o id é válido
class ValidadorMidleware {

    // validar se o id
    static checaId = (id) => {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            return id;
        }
        return false;
    }

    // busar o pessoa pelo id
    static async buscarPessoa(id) {
        let usuario = await usuario.findOne({ _id: id })
        // let nitExist = await pessoas.findOne({ _id: { $ne: id }, nit: req.body.nit })

        await cosonle.log(usuario);
        if (usuario) {
            return usuario;
        }
    }

  }

export default ValidadorMidleware;