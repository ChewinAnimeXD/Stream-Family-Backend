import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const authRequired = async (req, res, next) => {
    const token = req.headers.autentification; // Nota: asegúrate de que sea 'autentification' y no 'authorization'
    console.log("Este es el token de authrequired", token);

    if (!token) {
        return res.status(401).json({ message: "No token, autorización denegada" }); // Elimina el objeto req de la respuesta
    }

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Token invalido" });
        }
        req.user = user;
        next();
    });
};
