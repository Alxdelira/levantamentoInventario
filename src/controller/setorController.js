import PermisMiddleware from "../middlewares/PermisMiddleware.js";
import Setor from "../models/setor.js";

export default class SetorController {
  static cadastrarSetores = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
        const { nome, bloco, ativo } = req.body;

        const novoSetor = new Setor({
          nome,
          bloco,
          ativo,
        });

        if (!nome || !bloco) {
          return res.status(400).json({ error: true, code: 400, message: "Necessário preencher todos os campos" });
        }

        const setorExiste = await Setor.findOne({ nome });
        if (setorExiste) {
          return res.status(409).json({ error: true, code: 409, message: "Setor já cadastrado" });
        }

        const setorSalvo = await novoSetor.save();

        return res.status(201).json(setorSalvo);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static listarSetores = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
        const { nome, bloco, ativo } = req.query;
        const { page, perPage } = req.query;
        const options = {
          page: parseInt(page) || 1,
          limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
        };
        if (nome) {
          const setores = await Setor.paginate({ nome: RegExp(nome, "i") }, options);
          if (setores.totalDocs === 0) {
            return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
          }
          return res.status(200).json(setores);
        }
        if (bloco) {
          const setores = await Setor.paginate({ bloco: RegExp(bloco, "i") }, options);
          if (setores.totalDocs === 0) {
            return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
          }
          return res.status(200).json(setores);
        }
        if (ativo) {
          const setores = await Setor.paginate({ ativo: ativo }, options);
          if (setores.totalDocs === 0) {
            return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
          }
          return res.status(200).json(setores);
        }

        if (nome && bloco) {
          const setores = await Setor.paginate({ nome: RegExp(nome, "i"), bloco: RegExp(bloco, "i") }, options);
          if (setores.totalDocs === 0) {
            return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
          }
          return res.status(200).json(setores);
        }
        const setores = await Setor.paginate({}, options);
        if (setores.totalDocs === 0) {
          return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
        }

        return res.status(200).json(setores);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static listarSetoresPorId = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
        const { id } = req.params;

        const setor = await Setor.findById(id);

        if (!setor) {
          return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
        }

        return res.status(200).json(setor);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static atualizarSetoresPorId = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
        const { id } = req.params;
        const { nome, bloco, ativo } = req.body;

        const setorAtualizado = await Setor.findByIdAndUpdate(
          id,
          { nome, bloco, ativo},
          { new: true }
        );

        if (!setorAtualizado) {
          return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
        }

        if (!nome || !bloco) {
          return res.status(400).json({ error: true, code: 400, message: "Necessário preencher todos os campos" });
        }

        return res.status(200).json(setorAtualizado);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }
  static async atualizarSetoresParcial(req, res) {
    try {
      return await PermisMiddleware(req, res, async () => {
        const { id } = req.params;
        const { nome, bloco, ativo } = req.body;

        const setor = await Setor.findByIdAndUpdate(
          id,
          {
            nome,
            bloco,
            ativo,
          },
          { new: true }
        );

        if (!setor) {
          return res
            .status(404)
            .json({ error: true, code: 404, message: "Setor não encontrado" });
        }

        return res.status(200).json(setor);
      });
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }


  static deletarSetores = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
        const { id } = req.params;

        const setorRemovido = await Setor.findByIdAndRemove(id);

        if (!setorRemovido) {
          return res.status(404).json({ error: true, code: 404, message: "Setor não encontrado" });
        }

        return res.status(200).json({ message: "Setor removido com sucesso" });
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }
}
