import usuarios from ".././models/usuario.js";
import jwt from 'jsonwebtoken';
import { promisify } from 'util';

/*  
    Recupera o token do header da requisição e extrai o id do usuário
    Só chega aqui se o usuário estiver logado. Portanto, o token sempre estará presente. 
*/
const pegaToken = async (req) => {
    const [, token] = req.headers.authorization.split(' '); // desestruturação
    let decoded = await promisify(jwt.verify)(token, process.env.SECRET); // promisify converte uma função de callback para uma função async/await
    req.user_id = decoded.id;
    return req.user_id;
}

// Verifica se o usuário tem permissão para acessar o recurso
class PermissaoMidleware {
    // MÉTODO PARA VERIFICAR SE O USUÁRIO TEM PERMISSÃO PARA FAZER GET NA ROTA PASSADA COMO PARÂMETRO
    static verificarPermissao = async (rota_acessada, verbo, req, res, callback) => {

        // recupera todas as rotas que o usuario tem no perfil
        const usuarioPefil = await usuarios.findById(await pegaToken(req));

        // verifica se o usuario está ativo
        if (!usuarioPefil.ativo) {
            return res.status(401).json({ code: 401, message: "Usuário inativo!" })
        }

      
    }
}

export default PermissaoMidleware;