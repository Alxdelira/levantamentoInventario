import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../models/usuario.js';

export default class AuthController {
    static login = async (req, res) => {
        try {
            const { email, senha } = req.body;

            // Procura o usuário pelo email no banco de dados
            const userExist = await Usuario.findOne({ email }).select('+senha');

            // Verifica se o email e a senha foram fornecidos
            if (!email || !senha) {
                return res.status(400).json({ error: true, code: 400, message: 'Email e senha são obrigatórios' });
            }

            // Verifica se o usuário existe
            if (!userExist) {
                return res.status(401).json({ error: true, code: 401, message: 'Credenciais inválidas' });
            }

            // Verifica se a senha fornecida corresponde à senha do usuário
            const senhaCorreta = await bcrypt.compare(senha, userExist.senha);

            if (!senhaCorreta) {
                return res.status(401).json({ error: true, code: 401, message: 'Credenciais inválidas' });
            }

            // Gera um token JWT com o ID do usuário
            const token = jwt.sign({ id: userExist._id }, process.env.SECRET, process.env.EXPIREIN);

            // Retorna o token para o cliente
            return res.status(200).json({ token });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error: true, code: 500, message: 'Erro interno no servidor' });
        }
    }
}
