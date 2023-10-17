import express from 'express';
import * as postController from '../controller/post_controller.js';

const router = express.Router();

router.get("/",postController.index);
router.get("/get",postController.post);

export default router;