import Usuario from "../models/usuario.js";

export default class UsuarioController {
  static cadastrarUsuario = async (req, res) => {
    try {
      const { nome, email, senha, ativo } = req.body;

      const novoUsuario = new Usuario({
        nome,
        email,
        senha,
        ativo
      });

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: true, code: 400, message: "Necessario preencher todos os campos" })
      }


      const usuarioSalvo = await novoUsuario.save()

      return res.status(201).json(usuarioSalvo);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static listarUsuarios = async (req, res) => {
    try {
      const { nome, email, ativo } = req.query;
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }
      if (nome) {
        const usuarios = await Usuario.paginate({ nome: RegExp(nome, "i") }, options);
        return res.status(200).json(usuarios);
      } else if (usuarios.totalDocs === 0) {
        return res.status(404).json({ message: "Não Encontrado!" });
      }
      if (email) {
        const usuarios = await Usuario.paginate({ email: RegExp(email, "i") }, options);
        if (usuarios.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }
      if (nome && email) {
        const usuarios = await Usuario.paginate({ nome: RegExp(nome, "i"), email: RegExp(email, "i") }, options);
        if (usuarios.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }
      if (ativo == true) {
        const usuarios = await Usuario.paginate({ ativo: true }, options);
        if (usuarios.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      const usuarios = await Usuario.paginate({}, options);
      return res.status(200).json(usuarios);



    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static listarUsuarioPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const usuario = await Usuario.findById(id);

      if (!usuario) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" });
      }
      return res.status(200).json(usuario);

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static atualizarUsuario = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, email, senha, ativo } = req.body;

      const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        id,
        { nome, email, senha, ativo },
        { new: true }
      );

      if (!usuarioAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" });
      }

      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }


  static deletarUsuario = async (req, res) => {
    try {
      const { id } = req.params;

      const usuarioRemovido = await Usuario.findByIdAndRemove(id);

      if (!usuarioRemovido) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" });
      }

      return res.status(204).json({ message: "Usuário removido com sucesso" });

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }


  static atualizarUsuarioPatch = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const usuarioAtualizado = await Usuario.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!usuarioAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" });
      }

      return res.status(200).json(usuarioAtualizado);
    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }


}

