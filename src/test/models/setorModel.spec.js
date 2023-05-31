import { describe, expect, it, jest,} from '@jest/globals'
import setor from '../../models/setor'
import SetorController from '../../controller/setorController'

describe ('Deve retornar testes de unidade de setor', () => {
    afterEach(() => jest.clearAllMocks())

    const objetoSetor = {
        nome: 'administrativo',
        bloco: 'A',
        ativo: true
    }
    // testando instanciar objeto
    it('Deve instanciar um objeto de setor', () => {
        const set = new setor(objetoSetor)
        expect(set).toEqual(expect.objectContaining(objetoSetor))

        expect(set).toHaveProperty('nome', 'administrativo')
    })

        it('Deve retornar uma lista de Setor simulada com mock', () => {
            SetorController.listarSetores = jest.fn().mockReturnValue(
                [{
                    nome: 'administrativo',
                    bloco: 'A',
                    ativo: true
                }]
            )
            const retorno = SetorController.listarSetores()
            expect(retorno[0]).toHaveProperty('nome', 'administrativo')
            expect(SetorController.listarSetores).toBeCalledTimes(1)
        })
            
})