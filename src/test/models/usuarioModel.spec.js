import { describe, expect, it, jest,} from '@jest/globals'
import usuario from '../../models/usuario'
import UsuarioController from '../../controller/usuarioController'

describe ('Deve retornar testes de unidade de usuario', () => {
    afterEach(() => jest.clearAllMocks())

    const objetoUsuario = {
        nome:'Anakin Skywalker',
        email:'darthvader@gmail.com',
        senha: '1234',
        ativo: true
    }
    // testando instanciar objeto
    it('Deve instanciar um objeto de usuario', () => {
        const usu = new usuario(objetoUsuario)
        expect(usu).toEqual(expect.objectContaining(objetoUsuario))

        expect(usu).toHaveProperty('nome', 'Anakin Skywalker')
    })
    // testando métodos
    // it('Deve retornar cadastro de usuario simulado com mock', () => {
    //     const usuarioCadastrado = new usuario(objetoUsuario)
    //     UsuarioController.cadastrarUsuario = jest.fn().mockReturnValue({
    //         nome:'Anakin Skywalker',
    //         email:'darthvader@gmail.com',
    //         senha: '1234',
    //         ativo: true            
    //     })
    //     const retorno = UsuarioController.cadastrarUsuario()
    //     expect(retorno).toEqual(expect.objectContaining(usuarioCadastrado))
    // })
        it('Deve retornar uma lista de Usuarios simulada com mock', () => {
            UsuarioController.listarUsuarios = jest.fn().mockReturnValue(
                [{
                    nome:'Anakin Skywalker',
                    email:'darthvader@gmail.com',
                    senha: '1234',
                    ativo: true
                }]
            )
            const retorno = UsuarioController.listarUsuarios()
            expect(retorno[0]).toHaveProperty('nome', 'Anakin Skywalker')
            expect(UsuarioController.listarUsuarios).toBeCalledTimes(1)
        })
            
})