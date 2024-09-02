import express from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { tokensito } from '../controllers/auth.controller.js'; // Asegúrate de que esto esté en uso o elimínalo
import cookieParser from "cookie-parser"; // No es necesario si no usas cookies en este middleware

// Middleware de autenticación
export const authRequired = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "No token, autorización denegada", request: req });
    }

    // Asegura que el token tenga el formato 'Bearer <token>'
    const token = authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: "Formato de token incorrecto, autorización denegada" });
    }

    // Verificación del token JWT
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).json({ message: "Token inválido" });

      req.user = user; // Añade la información del usuario a la solicitud
      next(); // Llama a la siguiente función de middleware
    });

  } catch (error) {
    console.error("Error en la verificación del token:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};
