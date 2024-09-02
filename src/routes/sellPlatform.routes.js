import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getSellPlatforms, registerSellPlatform, deleteSellPlatform } from "../controllers/sellPlatform.controller.js";
import {validateSchema} from "../middlewares/validator.middleware.js"
import {createSellPlatformSchema} from '../schemas/sellPlatform.schema.js'

const router = Router();


router.get('/sellPlatforms', authRequired, getSellPlatforms);

//router.get('/registerPlatforms/:id', authRequired, getPlatform);

router.post('/registerSellPlatforms', authRequired, validateSchema(createSellPlatformSchema), registerSellPlatform);

router.delete('/sellPlatforms/:id', authRequired, deleteSellPlatform);

//router.put('/registerPlatforms/:id', authRequired, updatePlatform);

export default router