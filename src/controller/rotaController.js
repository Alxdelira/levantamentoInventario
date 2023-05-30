import Rotas from "../models/rota.js";

class RotaController {
  static listarRotas = async (req, res) => {
    try {
      const { rota } = req.query;
      const { page, perPage } = req.query;
      const options = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
      }
      if (rota) {
        const rotas = await Rotas.paginate({ nome: RegExp(nome, "i") }, options);
        return res.status(200).json(rotas);
      }

      const rotas = await Rotas.paginate({}, options);
      return res.status(200).json(rotas);

    } catch (error) {

      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }

  }



  static listarRotaPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const rota = await rotas.findById(id);

      if (!rota) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).json(rota);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static cadastrarRota = async (req, res) => {
    try {
      const rota = new rotas(req.body);
      await rota.save();

      return res.status(201).send(rota.toJSON());
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static atualizarRota = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const updatedRota = await rotas.findByIdAndUpdate(id, updateData);

      if (!updatedRota) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).json({ code: 200, message: "Operação bem sucedida" });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }

  static excluirRota = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedRota = await rotas.findByIdAndDelete(id);

      if (!deletedRota) {
        return res.status(404).json({ error: true, code: 404, message: "Id da rota não localizado." });
      }

      return res.status(200).send({ message: 'Rota removida com sucesso' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
    }
  }
}

export default RotaController;