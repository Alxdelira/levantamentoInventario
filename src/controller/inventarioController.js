import PermisMiddleware from '../middlewares/PermisMiddleware.js';
import Inventario from '../models/inventario.js';
import Item from '../models/item.js';

export default class InventarioController {

    static cadastrarInventario = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { setor, itens, criadoEm } = req.body

                const erros = [];

                if (!setor) {
                    erros.push({ setor: "error", message: "Setor não informado" });
                }

                if (!itens) {
                    erros.push({ itens: "error", message: "Itens não informado" });
                }

                if (erros.length > 0) {
                    return res.status(400).json(erros);
                }

                const novoInventario = new Inventario({
                    setor,
                    itens,
                    criadoEm
                });

                const inventarioSalvo = await novoInventario.save()
                return res.status(201).json(inventarioSalvo)

            });
        } catch (error) {
            res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
        }

    }

    static listarInventarios = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { setor, itens, criadoEm } = req.query;
                const { page, perPage } = req.query;

                const option = {
                    page: parseInt(page) || 1,
                    limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
                }

                if (setor) {
                    const inventario = await Inventario.paginate({ setor: setor }, option)
                    if (inventario.totalDocs === 0) {
                        return res.status(404).json({ message: "Não Encontrado!" });
                    }
                    return res.status(200).json(inventario);
                }
                if (criadoEm) {
                    const inventario = await Inventario.paginate({ criadoEm: criadoEm }, option)
                    if (inventario.totalDocs === 0) {
                        return res.status(404).json({ message: "Não Encontrado!" });
                    }
                    return res.status(200).json(inventario);
                }

                if (itens) {
                    const inventario = await Inventario.paginate({ itens: itens }, option)
                    if (inventario.totalDocs === 0) {
                        return res.status(404).json({ message: "Não Encontrado!" });
                    }
                    return res.status(200).json(inventario);
                }
                if (setor && itens) {
                    const inventario = await Inventario.paginate({ setor: setor, itens: itens }, option)
                    if (inventario.totalDocs === 0) {
                        return res.status(404).json({ message: "Não Encontrado!" });
                    }
                    return res.status(200).json(inventario);
                }

                if (setor && criadoEm) {
                    const inventario = await Inventario.paginate({ setor: setor, criadoEm: criadoEm }, option)
                    if (inventario.totalDocs === 0) {
                        return res.status(404).json({ message: "Não Encontrado!" });
                    }
                    return res.status(200).json(inventario);
                }
                if (itens && criadoEm) {
                    const inventario = await Inventario.paginate({ itens: itens, criadoEm: criadoEm }, option)
                    if (inventario.totalDocs === 0) {
                        return res.status(404).json({ message: "Não Encontrado!" });
                    }
                    return res.status(200).json(inventario);
                }

                const inventario = await Inventario.paginate({}, option)
                return res.status(200).json(inventario);
            })
        } catch (error) {
            res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
        }
    }

    static listarInventariosId = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { id } = req.params
                const inventario = await Inventario.findById(id)

                if (!inventario) {
                    return res.status(404).json({ error: true, code: 404, message: "Inventario não Encontrado!" })
                }

                return res.status(200).json(inventario);
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno no Servidor!" })
        }
    }

    static atualizarInventario = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { id } = req.params
                const { setor, itens: itens, criadoEm } = req.body;

                const erros = [];

                if (!setor) {
                    erros.push({ setor: "error", message: "Setor não informado" });
                }

                if (!itens) {
                    erros.push({ itens: "error", message: "Itens não informado" });
                }

                if (!criadoEm) {
                    erros.push({ criadoEm: "error", message: "Data não informado" });
                }

                if (erros.length > 0) {
                    return res.status(400).json(erros);
                }

                const inventarioAtualizado = await Inventario.findByIdAndUpdate(
                    id,
                    { setor, itens: itens, criadoEm },
                    { new: true }
                );

                if (!inventarioAtualizado) {
                    return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" })
                }

                return res.status(200).json(inventarioAtualizado)
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro Interno no Servidor" })
        }
    }

    static atualizarInventarioParcial = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
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
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
        }
    }

    static adicionarItensInventarioParcial = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { id } = req.params;
                const updateData = req.body;

                const item = await Item.findById(updateData.itens);
                if (!item) {
                    return res.status(404).json({ error: true, code: 404, message: "Item não encontrado" });
                }

                const inventarioAtualizado = await Inventario.findByIdAndUpdate(
                    id,
                    { $push: { "itens": updateData.itens } },
                    { new: true }
                );
                if (!inventarioAtualizado) {
                    return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" });
                }
                return res.status(200).json(inventarioAtualizado);
            });
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
        }
    }

    static removerItensInventarioParcial = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { id } = req.params;
                const updateData = req.body;


                const inventarioAtualizado = await Inventario.findByIdAndUpdate(
                    id,
                    { $pull: { "itens": updateData.itens } },
                    { new: true }
                );
                if (!inventarioAtualizado) {
                    return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" });
                }
                return res.status(200).json(inventarioAtualizado);
            });
        } catch (error) {
            return res
            .status(500)
            .json({ error: true, code: 500, message: "Erro interno no servidor" });
        }
    }
    static deletarInventario = async (req, res) => {
        try {
            return await PermisMiddleware(req, res, async () => {
                const { id } = req.params
                const inventarioRemovido = await Inventario.findByIdAndRemove(id);

                if (!inventarioRemovido) {
                    return res.status(404).json({ error: true, code: 404, message: "Inventario não encontrado" })
                }

                return res.status(200).json({ message: "Inventario removido com sucesso!" })
            })
        } catch (error) {
            return res.status(500).json({ error: true, code: 500, message: "Erro Interno no Servidor" })
        }
    }


}
