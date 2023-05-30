import Inventario from '../models/inventario.js';

export default class InventarioController {
    static cadastrarInventario = async (req, res) => {
        try {
            const { setor, bloco, item, criadoEm } = req.body

            const novoInventario = new Inventario({
                setor,
                bloco,
                item,
                criadoEm
            });

            const inventarioSalvo = await novoInventario.save()
            return res.status(201).json({ message: "Inventario salvo com sucesso!" }, inventarioSalvo)


        } catch (error) {
            res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
        }

    }
    static listarInventarios = async (req, res) => {
        try {
            const { setor, bloco, item } = req.query;
            const { page, perPage } = req.query;

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
            if (setor && item) {
                const setorItem = await Inventario.paginate({ setor: setor, item: item }, option)
                return res.status(200).json(setorItem);
            }

            const inventario = await Inventario.paginate({}, option)
            return res.status(200).json(inventario);

        } catch (error) {
            res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
        }
    }

    static listarInventariosId = async (req, res) => {
        try {
            const { id } = req.params
            const inventario = await Inventario.findById(id)

            if (!inventario) {
                return res.status(404).json({ error: true, code: 404, message: "Inventario não Encontrado!" })
            }

            return res.status(200).json(inventario);

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno no Servidor!" })
        }
    }


}
