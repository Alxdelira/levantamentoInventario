import PermisMiddleware from "../middlewares/PermisMiddleware.js";
import Rotas from "../models/rota.js";

class RotaController {
  static listarRotas = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
      const { rota } = req.query;
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }
      if (rota) {
        const rotas = await Rotas.paginate({ nome: RegExp(nome, "i") }, options);
        if (!rotas) {
          return res.status(404).json({ error: true, code: 404, message: "Rota não localizada." });
        }
        return res.status(200).json(rotas);
      }

      const rotas = await Rotas.paginate({}, options);
      return res.status(200).json(rotas);
    });
    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }

  }

  static listarRotaPorId = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
      const { id } = req.params;
      const rota = await Rotas.findById(id);

      if (!rota) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).json(rota);
    });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static cadastrarRota = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
      const rota = new Rotas(req.body);
      await rota.save();

      return res.status(201).json(rota);
    });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static atualizarRota = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
      const { id } = req.params;
      const updateData = req.body;

      const updatedRota = await Rotas.findByIdAndUpdate(id, updateData);

      if (!updatedRota) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).json(updateData);
    });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static atualizarRotaParcialmente = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
      const { id } = req.params;
      const updateData = req.body;
      const rotaAtualizado = await Rotas.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!rotaAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).json(rotaAtualizado);
    });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }
  static excluirRota = async (req, res) => {
    try {
      return await PermisMiddleware(req, res, async () => {
      const { id } = req.params;
      const deletedRota = await Rotas.findByIdAndDelete(id);

      if (!deletedRota) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).send({ message: 'Rota removida com sucesso' });
    });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }
}

export default RotaController;