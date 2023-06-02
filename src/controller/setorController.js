import Setor from "../models/setor.js";

class SetorController {

  static cadastrarSetores = async (req, res) => {
    try {

      const { nome, bloco, ativo } = req.body

      const novoSetor = new Setor({
        nome, bloco, ativo
      });

      if (!nome || !bloco || !ativo) {
        return res.status(400).json({ error: true, code: 400, message: "Necessario preencher todos os campos" })
      }

      const setorsalvo = await novoSetor.save()
      return res.status(201).json(novoSetor);

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro Interno Servidor" })
    }
  }

  static listarSetores = async (req, res) => {
    try {

      const { nome, bloco, ativo } = req.query
      const { page, perPage } = req.query;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }

      if (nome) {
        const setor = await Setor.paginate({ nome: RegExp(nome, "i") }, options);
        if (setor.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (bloco) {
        const bloco = await Setor.paginate({ bloco: RegExp(bloco, "i") }, options);
        if (setor.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (ativo) {
        const ativo = await Setor.paginate({ ativo: ativo }, options);
        if (setor.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      const setor = await Setor.paginate({}, options);
      return res.status(200).json(setor);

    } catch (err) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static listarSetoresId = async (req, res) => {
    try {
      const { id } = req.params;

      const setor = await Setor.findById(id);

      if (!setor) {
        return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
      }
      return res.status(200).json(setor);

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro Interno no Servidor" })
    }
  }

  static atualizarSetor = async (req, res) => {
    try {
      const { id } = req.params;
      const { nome, bloco, ativo } = req.body

      const setorAtualizado = await Setor.findByIdAndUpdate(
        id,
        { nome, bloco, ativo },
        { new: true }
      );

      if (!setorAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
      }

      return res.status(200).json(setorAtualizado);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }


  static deletarSetor = async (req, res) => {
    try {
      const { id } = req.params;

      const setorRemovido = await Setor.findByIdAndRemove(id);

      if (!setorRemovido) {
        return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
      }

      return res.status(204).json({ message: "Setor removido com sucesso" });

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static atualizarSetorPatch = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const setorAtualizado = await Setor.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!setorAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
      }

      return res.status(200).json(setorAtualizado);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }


}

export default SetorController;
