import Usuario from "../models/usuario.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class LoginController {
  static logar = async (req, res) => {
    try {
      const { email, senha } = req.body;

      const usuario = await Usuario.findOne({ email }).select("+senha");

      if (!usuario) {
        return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" });
      }
      if (!senha || !usuario.senha) {
        return res.status(400).json({ error: true, code: 400, message: "Senha não fornecida" });
      }
      const senhaValida = await bcrypt.compare(senha, usuario.senha);

      if (!senhaValida) {
        return res.status(401).json({ error: true, code: 401, message: "Senha inválida" });
      }

      const token = jwt.sign({ id: usuario._id }, process.env.SECRET, {
        expiresIn: "1d",
      });

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error)
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };
}

export default LoginController;


