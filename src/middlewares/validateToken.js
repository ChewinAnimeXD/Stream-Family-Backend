import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    console.log("Encabezados de la solicitud:", req.headers);  // Verificar los encabezados de la solicitud
    console.log("Auth Header:", authHeader);  // Verificar el encabezado de autorización

    if (!authHeader) {
        return res.status(401).json({ message: "No token, autorización denegada" });
    }

    const token = authHeader.split(' ')[1];  // Obtener el token después de "Bearer "
    console.log("Este es el token de authrequired", token);

    if (!token) {
        return res.status(401).json({ message: "No token, autorización denegada" });
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token inválido" });
        }
        req.user = user;
        next();
    });
};
