import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getPlatforms, getPlatform, registerPlatform, updatePlatform, deletePlatform } from "../controllers/platform.controller.js";
import {validateSchema} from "../middlewares/validator.middleware.js"
import {createPlatformSchema} from '../schemas/platform.schema.js'

const router = Router();

router.get('/platforms', authRequired, getPlatforms);

router.get('/registerPlatforms/:id', authRequired, getPlatform);

router.post('/registerPlatforms', authRequired, validateSchema(createPlatformSchema), registerPlatform);

router.delete('/platforms/:id', authRequired, deletePlatform);

router.put('/registerPlatforms/:id', authRequired, updatePlatform);

export default router