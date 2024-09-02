import { Router } from "express";
import { login, register, logout, profile, verifyToken, getUsers, deleteUser, updateUser, getUser} from '../controllers/auth.controller.js';
import {authRequired} from '../middlewares/validateToken.js'
import {validateSchema} from "../middlewares/validator.middleware.js"
import {registerSchema, loginSchema} from "../schemas/auth.schema.js"

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema), login);
router.post('/logout', logout);

router.get("/verify", verifyToken);
router.get('/profile', authRequired, profile);
router.get('/userPage', getUsers);
router.get('/register/:id', authRequired, getUser);

router.delete('/userPage/:id', authRequired, deleteUser);

router.put('/register/:id', authRequired, updateUser);

export default router
