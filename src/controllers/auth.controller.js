import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { createAccesToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../config.js";

export const register = async (req, res) => {
  const { username, email, role, password, balance } = req.body;
  
  try {
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json(["El correo ya está en uso"]);
    
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      role,
      password: passwordHash, 
      balance,
    });
    const userSaved = await newUser.save();
    
    res.json({
      Message: "Usuario creado satisfactoriamente",
      id: userSaved._id,
      username: userSaved.username,
      email: userSaved.email,
      role: userSaved.role,
      balance: userSaved.balance,
    });
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Excluye la contraseña en la respuesta
    res.json(users);
  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ Message: "Usuario no encontrado" });
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ Message: "Usuario no encontrado" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userFound = await User.findOne({ email });
    if (!userFound)
      return res.status(400).json({
        message: ["El correo no existe"],
      });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch) {
      return res.status(400).json({
        message: ["La contraseña es incorrecta"],
      });
    }

    const token = await createAccesToken({ id: userFound._id });
    
    res.cookie("token", token, {
      expires: new Date(Date.now() + 86400 * 1000), // 1 día de expiración
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Usar solo HTTPS en producción
      sameSite: "None", // Para enviar cookies entre diferentes dominios
    });

    res.json({
      Message: "Usuario encontrado",
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      balance: userFound.balance,
      token, // Incluye el token en la respuesta
    });

  } catch (error) {
    res.status(500).json({ Message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  try {
    const userFound = await User.findById(req.user.id);
    if (!userFound) return res.status(400).json({ Message: "Usuario no encontrado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      balance: userFound.balance,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const verifyToken = async (req, res) => {
  const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "No autorizado" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(403).json({ message: "Token inválido" });

    const userFound = await User.findById(user.id);
    if (!userFound) return res.status(401).json({ message: "No autorizado" });

    return res.json({
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
      balance: userFound.balance,
    });
  });
};

export const updateUser = async (req, res) => {
  try {
    const { password, ...updateData } = req.body;
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      updateData.password = passwordHash;
    }
    const user = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ Message: "Usuario no encontrado" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

