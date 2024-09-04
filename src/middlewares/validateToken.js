// Código de autenticación
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = async (req, res, next) => {
  const token = req.cookies.token; // Obtener el token desde las cookies

  if (!token) {
    return res.status(401).json({ message: "No token, autorización denegada" });
  }

  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user; // Asignar usuario verificado al request
    next(); // Continuar al siguiente middleware
  });
};
