import Inventario from '../models/inventario.js';

export default class InventarioController {
    static listarInventarios = async (req, res) => {
        try {
            const setor = req.query.setor;
            const bloco = req.query.bloco;
            const item = req.query.item;
            const page = req.query.page;
            const perPage = req.query.perPage;

            const option = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
            }

            if (setor) {
                const setor = await Inventario.paginate({ setor: setor }, option)
                return res.status(200).json(setor);
            }
            if (bloco) {
                const bloco = await Inventario.paginate({ bloco: bloco }, option)
                return res.status(200).json(bloco);
            }
            if (item) {
                const item = await Inventario.paginate({ item: item }, option)
                return res.status(200).json(item);
            }
            
            const inventario = await Inventario.paginate({}, option)
            return res.status(200).json(inventario);

        } catch (error) {
            res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
        }
    }
}
