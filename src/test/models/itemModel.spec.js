import { describe, expect, it, jest,} from '@jest/globals'
import item from '../../models/item'
import ItemController from '../../controller/itemController'
import mongoose from "mongoose"

describe ('Deve retornar testes de unidade de Item', () => {
    afterEach(() => jest.clearAllMocks())

    const setorID = mongoose.Schema.Types.ObjectId.get()
    const objetoItem = {
        setor:setorID,
        etiqueta: 1,      
        naoEtiquetado: false,
        encontrado: true,
        nome: 'Cadeira',
        estado: 'top',
        ativo: true,
        descricao: 'cadeira top',
        responsavel: 'josé ninguem',
        image: '.img'
      }
    // testando instanciar objeto
    it('Deve instanciar um objeto de Item', () => {
        const itm = new item(objetoItem)
        expect(itm).toEqual(expect.objectContaining(objetoItem))

        // expect(itm).toHaveProperty('setor', setorID)
    })
    
        it('Deve retornar uma lista de items simulada com mock', () => {
            ItemController.listarItems = jest.fn().mockReturnValue(
                [{
                    etiqueta: 1,      
                    naoEtiquetado: true,
                    encontrado: true,
                    nome: 'Cadeira',
                    setor: setorID,
                    estado: 'top',
                    ativo: true,
                    descricao: 'cadeira top',
                    responsavel: 'josé ninguem',
                    image: '.img'
                }]
            )
            const retorno = ItemController.listarItems()
            expect(retorno[0]).toHaveProperty('setor', setorID)
            expect(ItemController.listarItems).toBeCalledTimes(1)
        })
            
})