import Inventario from '../models/inventario.js';

export default class InventarioController {
    static cadastrarInventario = async (req, res) => {
        try {
            const { setor, itens, criadoEm } = req.body

            const novoInventario = new Inventario({
                setor,
                itens,
                criadoEm
            });

            const inventarioSalvo = await novoInventario.save()
            return res.status(201).json(inventarioSalvo)


        } catch (error) {
            res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
        }

    }
    static listarInventarios = async (req, res) => {
        try {
            const { setor, itens, criadoEm } = req.query;
            const { page, perPage } = req.query;

            const option = {
                page: parseInt(page) || 1,
                limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
            }

            if (setor) {
                const setor = await Inventario.paginate({ setor: setor }, option)
                if (inventario.totalDocs === 0) {
                    return res.status(404).json({ message: "Não Encontrado!" });
                }
            }
            if (criadoEm) {
                const setor = await Inventario.paginate({ criadoEm: criadoEm }, option)
                if (inventario.totalDocs === 0) {
                    return res.status(404).json({ message: "Não Encontrado!" });
                }
            }

            if (itens) {
                const item = await Inventario.paginate({ item: item }, option)
                if (inventario.totalDocs === 0) {
                    return res.status(404).json({ message: "Não Encontrado!" });
                }
            }
            if (setor && item) {
                const setorItem = await Inventario.paginate({ setor: setor, item: item }, option)
                if (inventario.totalDocs === 0) {
                    return res.status(404).json({ message: "Não Encontrado!" });
                }
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

    static atualizarInventario = async (req, res) => {
        try {

            const { id } = req.params
            const { setor, item: itens, criadoEm } = req.body;

            const inventarioAtualizado = await Inventario.findByIdAndUpdate(
                id,
                { setor, itens: itens, criadoEm },
                { new: true }
            );

            if (!inventarioAtualizado) {
                return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" })
            }

            return res.status(200).json(inventarioAtualizado)

        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro Interno no Servidor" })

        }
    }
    static atualizarInventarioParcial = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;

            const inventarioAtualizado = await Inventario.findByIdAndUpdate(
                id,
                updateData,
                { new: true }
            );

            if (!inventarioAtualizado) {
                return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" });
            }

            return res.status(200).json(inventarioAtualizado);
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
        }
    }
    static deletarInventario = async (req, res) => {
        try {
            const { id } = req.params
            const inventarioRemovido = await Inventario.findByIdAndRemove(id);

            if (!inventarioRemovido) {
                return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" })
            }

            return res.status(204).json({ message: "Inventario removido com sucesso!" })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro Interno no Servidor" })
        }
    }


}
