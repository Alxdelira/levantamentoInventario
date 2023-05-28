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
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10
            }
            
            if (nome) {
                const setor = await Setor.paginate({nome: RegExp(nome, "i")}, options);
                return res.status(200).json(setor);
            }

            if (bloco) {
                const bloco = await Setor.paginate({bloco: RegExp(bloco, "i")}, options);
                return res.status(200).json(bloco);
            }

            if (ativo) {
                const ativo = await Setor.paginate({ativo: RegExp(ativo, "i")}, options);
                return res.status(200).json(ativo);
            }

            
            const setor = await Setor.paginate({}, options);
            return res.status(200).json(setor);

        } catch (err) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno do servidor" });
        }
    }
}

export default SetorController;
