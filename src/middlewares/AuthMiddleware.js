import jwt from 'jsonwebtoken';

const AuthMiddleware = async (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ error: true, code: 401, message: "Não autorizado" });
        }

        const token = authorizationHeader.split(" ");

        if (token.length !== 2 || token[0] !== "Bearer") {
            return res.status(401).json({ error: true, code: 401, message: "Formato de token inválido" });
        }

        const decoded = jwt.verify(token[1], process.env.SECRET);

        req.usuarioId = decoded.id;

        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ error: true, code: 401, message: "Não autorizado", detail: error.message });
    }
};

export default AuthMiddleware;



