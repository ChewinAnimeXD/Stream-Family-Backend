import express from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';
import { tokensito } from '../controllers/auth.controller.js';
import cookieParser from "cookie-parser";

//const app = express();
//app.use(cookieParser());

export const authRequired = async (req, res, next) => {

    //const token = req.headers.authorization;
 
    const token = req.headers.autentification
    console.log("Este es el token de authrequired",token);

    if (!token) return res.status(401).json({ Message: "No token, autorización denegada ", request:req});

    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if(err) return res.status(403).json({ message: "Token invalido"});
        req.user = user;
        next();
    });
};