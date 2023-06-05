import jwt from 'jsonwebtoken';
import { promisify } from 'util';

const AuthMiddleware = async (req, res, next) => {
  const auth = req.headers.authorization;
  
  if (!auth) {
    return res.status(498).json({ code: 498, message: "O token de autenticação não existe!" });
  }
  
  const [, token] = auth.split(' '); // desestruturação

  try {
    const decoded = await promisify(jwt.verify)(token, process.env.SECRET);
    if (!decoded) {
      return res.status(498).json({ error: true, code: 498, message: "O token está expirado!" });
    } else {
      req.user_id = decoded.id;
      return next();
    }

  } catch {
    return res.status(498).json({ error: true, code: 498, message: "O token está inválido!" });
  }
};

export default AuthMiddleware;
