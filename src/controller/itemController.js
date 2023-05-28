import Item from '../models/item.js';



export default class ItemController {
  static  listarItem = async(req, res) => {
    try {
      const etiqueta = req.query.etiqueta;
      const nome = req.query.nome;
      const setor = req.query.setor;
      const estado = req.query.estado;
      const responsavel= req.query.responsavel;
      const ativo = req.query.ativo;
      const page = req.query.page;
      const perPage = req.query.perPage;

      const option = {
        page: parseInt(page) || 1,
        limit: parseInt(perPage) > 10 ? 10 : parseInt(perPage) || 10,
      }

      if(etiqueta){
        const item = await Item.paginate({etiqueta: new RegExp(etiqueta, "i")},option)
        return res.status(200).json(item);
      }

      if(nome){
        const item = await Item.paginate({nome: new RegExp(nome, "i")},option)
        return res.status(200).json(item);
      }

      if(setor){
        const item = await Item.paginate({setor: new RegExp(setor, "i")},option)
        return res.status(200).json(item);
      }

      if(estado){
        const item = await Item.paginate({estado: new RegExp(estado, "i")},option)
        return res.status(200).json(item);
      }

      if(responsavel){
        const item = await Item.paginate({responsavel: new RegExp(responsavel, "i")},option)
        return res.status(200).json(item);
      }

      if(ativo){
        const item = await Item.paginate({ativo:ativo},option)
        return res.status(200).json(item);
      }

      const item = await Item.paginate({},option)
      return res.status(200).json(item);
      
    } catch (error) {
      res.status(500).json({ error: true, code: 500, mensagem:"Erro Interno no Servidor" });
    }

  }

}


