import { Router } from "express";
import { validateBody } from "../middlewares/validate";
import { createEventSchema } from '../validators/event.schema.js'
import { validateMongoIdParam } from '../validators/expressValidator.js'
import * as EventCtrl from '../controllers/event.controller.js'
import { requireAuth, requireRole } from "../middlewares/auth";

const router = Router();

router.get('/', EventCtrl.list);
router.get('/:id', validateMongoIdParam('id'), EventCtrl.get);

router.post('/', requireAuth, requireRole('organizer','admin'), validateBody(createEventSchema), EventCtrl.create);

export default router;