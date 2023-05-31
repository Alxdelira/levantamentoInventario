import { describe, expect, it, jest,} from '@jest/globals'
import inventario from '../../models/inventario'
import InventarioController from '../../controller/inventarioController'
import mongoose from "mongoose"

describe ('Deve retornar testes de unidade de Inventario', () => {
    afterEach(() => jest.clearAllMocks())

    const setorID = mongoose.Schema.Types.ObjectId.get()
    const objetoinventario = {
        setor: setorID,
        itens: [],
        criadoEm: new Date()
    }
    // testando instanciar objeto
    it('Deve instanciar um objeto de Inventario', () => {
        const inv = new inventario(objetoinventario)
        expect(inv).toEqual(expect.objectContaining(objetoinventario))

        expect(inv).toHaveProperty('setor', setorID)
    })
    
        it('Deve retornar uma lista de inventarios simulada com mock', () => {
            InventarioController.listarInventarios = jest.fn().mockReturnValue(
                [{
                    setor: setorID,
                    itens: [{ _id: mongoose.Schema.Types.ObjectId.get()}],
                    criadoEm: new Date()
                }]
            )
            const retorno = InventarioController.listarInventarios()
            expect(retorno[0]).toHaveProperty('setor', setorID)
            expect(InventarioController.listarInventarios).toBeCalledTimes(1)
        })
            
})