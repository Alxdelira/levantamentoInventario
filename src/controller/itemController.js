import Item from '../models/item.js';



export default class ItemController {
  static cadastrarItem = async (req, res) => {
    try {
      const { etiqueta, naoEtiquetado, encontrado, nome, setor, estado, descricao, responsavel, image, ativo } = req.body
      
      const erros = [];

      if (!nome) {
        erros.push({email: "error", message: "Nome não informado" });
      }

      if (!setor) {
        erros.push({zip_code: "error", message: "Setor não informado" });
      }

      if (!estado) {
        erros.push({email: "error", message: "Estado não informado" });
      }

      if (!descricao) {
        erros.push({zip_code: "error", message: "Descrição não informado" });
      }

      if (!responsavel) {
        erros.push({email: "error", message: "Responsável não informado" });
      }

      if (!ativo) {
        erros.push({zip_code: "error", message: "Ativo não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }


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
        responsavel,
        ativo
      } = req.query
      const { page, perPage } = req.query;

      const option = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
      }

      if (etiqueta) {
        const item = await Item.paginate({ etiqueta: etiqueta }, option);
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (naoEtiquetado) {
        const item = await Item.paginate({ naoEtiquetado: naoEtiquetado }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }
      if (encontrado) {
        const item = await Item.paginate({ encontrado: encontrado }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (nome) {
        const item = await Item.paginate({ nome: new RegExp(nome, "i") }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (setor) {
        const item = await Item.paginate({ setor: setor }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (estado) {
        const item = await Item.paginate({ estado: new RegExp(estado, "i") }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (responsavel) {
        const item = await Item.paginate({ responsavel: new RegExp(responsavel, "i") }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }

      if (ativo) {
        const item = await Item.paginate({ ativo: ativo }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
      }
      if (etiqueta && responsavel) {
        const item = await Item.paginate({ etiqueta: etiqueta, responsavel: new RegExp(responsavel, "i") }, option)
        if (item.totalDocs === 0) {
          return res.status(404).json({ message: "Não Encontrado!" });
        }
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

      const erros = [];

      if (!nome) {
        erros.push({email: "error", message: "Nome não informado" });
      }

      if (!setor) {
        erros.push({zip_code: "error", message: "Setor não informado" });
      }

      if (!estado) {
        erros.push({email: "error", message: "Estado não informado" });
      }

      if (!descricao) {
        erros.push({zip_code: "error", message: "Descrição não informado" });
      }

      if (!responsavel) {
        erros.push({email: "error", message: "Responsável não informado" });
      }

      if (!ativo) {
        erros.push({zip_code: "error", message: "Ativo não informado" });
      }

      if (erros.length > 0) {
        return res.status(400).json(erros);
      }

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

      return res.status(200).json({ message: "Item removido com sucesso" });

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