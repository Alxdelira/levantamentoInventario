import Usuario from "../models/usuario.js";
import jwt from "jsonwebtoken";

const PermisMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: true, code: 401, message: "Não autorizado" });
        }
        
        const token = authorizationHeader.split(" ");
        if (!token || token.length !== 2 || token[0] !== "Bearer") {
            return res.status(401).json({ error: true, code: 401, message: "Formato de token inválido" });
        }

        const decoded = jwt.verify(token[1], process.env.SECRET);
        const usuario = await Usuario.findById(decoded.id);
        if (!usuario) {
            return res.status(404).json({ error: true, code: 404, message: "Usuário não encontrado" });
        }

        req.usuarioId = decoded.id;

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ error: true, code: 401, message: "Não autorizado" });
    }
};

export default PermisMiddleware;



