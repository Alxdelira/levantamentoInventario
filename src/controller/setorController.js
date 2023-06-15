import Setor from "../models/setor.js";

class SetorController {
  static async listarSetores(req, res) {
    try {
      const nome = req.query.nome;
      const bloco = req.query.bloco;
      const ativo = req.query.ativo;
      const page = req.query.page;
      const perPage = req.query.perPage;

      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
      };

      if (nome) {
        const setor = await Setor.paginate(
          { nome: RegExp(nome, "i") },
          options
        );
        return res.status(200).json(setor);
      }

      if (bloco) {
        const bloco = await Setor.paginate(
          { bloco: RegExp(bloco, "i") },
          options
        );
        return res.status(200).json(bloco);
      }

      if (ativo) {
        const ativo = await Setor.paginate(
          { ativo: RegExp(ativo, "i") },
          options
        );
        return res.status(200).json(ativo);
      }

      const setor = await Setor.paginate({}, options);
      return res.status(200).json(setor);
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static async listarSetoresPorId(req, res) {
    try {
      const { id } = req.params;

      if (id.length !== 24) {
        return res
          .status(400)
          .json({ error: true, code: 400, message: "ID inválido" });
      }
      const setor = await Setor.findById(id);


      if (!setor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Setor não encontrado" });
      }

      return res.status(200).json(setor);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static async cadastrarSetores(req, res) {
    try {
      const { nome, bloco, ativo } = req.body;

      const erros = [];

      if (!nome) {
        erros.push({ email: "error", message: "Nome não informado" });
      }

      if (!bloco) {
        erros.push({ zip_code: "error", message: "Bloco não informado" });
      }

      if (!ativo) {
        erros.push({ email: "error", message: "Ativo não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

      const setor = new Setor({
        nome,
        bloco,
        ativo,
      });

      await setor.save();

      return res.status(201).json(setor);
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static async atualizarSetoresPorId(req, res) {
    try {
      const { id } = req.params;
      const { nome, bloco, ativo } = req.body;

      const erros = [];

      if (!nome) {
        erros.push({ email: "error", message: "Nome não informado" });
      }

      if (!bloco) {
        erros.push({ zip_code: "error", message: "Bloco não informado" });
      }

      if (!ativo) {
        erros.push({ email: "error", message: "Ativo não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

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
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static async atualizarSetoresParcial(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const setor = await Setor.findByIdAndUpdate(id, updates, { new: true });

      if (!setor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Setor não encontrado" });
      }

      return res.status(200).json(setor);
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static async deleteSetores(req, res) {
    try {
      const { id } = req.params;

      const setor = await Setor.findByIdAndDelete(id);

      if (!setor) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Setor não encontrado" });
      }

      return res.status(200).json({ message: "Setor excluído com sucesso" });
    } catch (err) {
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }
}

export default SetorController;
