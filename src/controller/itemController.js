import Item from '../models/item.js';



export default class ItemController {
  static cadastrarItem = async (req, res) => {
    try {
      const { etiqueta, naoEtiquetado, encontrado, nome, setor, estado, descricao, responsavel, image, ativo } = req.body

      const novoItem = new Item({
        etiqueta,
        naoEtiquetado,
        encontrado,
        nome,
        setor,
        estado,
        descricao,
        responsavel,
        image,
        ativo
      });

      const itemSalvo = await novoItem.save()
      return res.status(201).json(itemSalvo);


    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro Interno no Servidor!" })
    }
  }
  static listarItem = async (req, res) => {
    try {
      const {
        etiqueta,
        naoEtiquetado,
        encontrado,
        nome,
        setor,
        estado,
        descricao,
        responsavel,
        ativo
      } = req.query
      const { page, perPage } = req.query;

      const option = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
      }

      if (etiqueta) {
        const item = await Item.paginate({ etiqueta: new RegExp(etiqueta, "i") }, option)
        return res.status(200).json(item);
      }
      if (naoEtiquetado) {
        const item = await Item.paginate({ naoEtiquetado: new RegExp(etiqueta, "i") }, option)
        return res.status(200).json(item);
      }
      if (encontrado) {
        const item = await Item.paginate({ encontrado: new RegExp(etiqueta, "i") }, option)
        return res.status(200).json(item);
      }

      if (nome) {
        const item = await Item.paginate({ nome: new RegExp(nome, "i") }, option)
        return res.status(200).json(item);
      }

      if (setor) {
        const item = await Item.paginate({ setor: new RegExp(setor, "i") }, option)
        return res.status(200).json(item);
      }

      if (estado) {
        const item = await Item.paginate({ estado: new RegExp(estado, "i") }, option)
        return res.status(200).json(item);
      }

      if (responsavel) {
        const item = await Item.paginate({ responsavel: new RegExp(responsavel, "i") }, option)
        return res.status(200).json(item);
      }

      if (ativo) {
        const item = await Item.paginate({ ativo: ativo }, option)
        return res.status(200).json(item);
      }
      if (etiqueta && responsavel) {
        const item = await Item.paginate({ etiqueta: new RegExp(etiqueta, "i"), responsavel: new RegExp(responsavel, "i") }, option)
        return res.status(200).json(item);
      }

      const item = await Item.paginate({}, option)
      return res.status(200).json(item);

    } catch (error) {
      res.status(500).json({ error: true, code: 500, mensagem: "Erro Interno no Servidor" });
    }

  }
  static listarItemPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const item = await Item.findById(id);

      if (!item) {
        return res.status(404).json({ error: true, code: 404, message: "Item não encontrado" });
      }
      return res.status(200).json(item);

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static atualizarItem = async (req, res) => {
    try {
      const { id } = req.params;
      const { etiqueta, naoEtiquetado, encontrado, nome, setor, estado, descricao, responsavel, image, ativo } = req.body

      const itemAtualizado = await Item.findByIdAndUpdate(
        id,
        { etiqueta, naoEtiquetado, encontrado, nome, setor, estado, descricao, responsavel, image, ativo },
        { new: true }
      );

      if (!itemAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Item não encontrado" });
      }

      return res.status(200).json(itemAtualizado);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }


  static deletarItem = async (req, res) => {
    try {
      const { id } = req.params;

      const itemRemovido = await Item.findByIdAndRemove(id);

      if (!itemRemovido) {
        return res.status(404).json({ error: true, code: 404, message: "Item não encontrado" });
      }

      return res.status(204).json({ message: "Item removido com sucesso" });

    } catch (error) {
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

  static atualizarItemPatch = async (req, res) => {
    try {
      const { id } = req.params;
      const updateData = req.body;

      const itemAtualizado = await Item.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

      if (!itemAtualizado) {
        return res.status(404).json({ error: true, code: 404, message: "Item não encontrado" });
      }

      return res.status(200).json(itemAtualizado);
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  }

}


