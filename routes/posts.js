const express = require('express');
const postController = require('../controller/post_controller.js');
const checkAuthMiddleWare = require('../middleware/check-auth.js')

const router = express.Router();

router.post("/create",checkAuthMiddleWare.checkAuth,postController.save);
router.get("/:id",checkAuthMiddleWare.checkAuth,postController.show);
router.get("/",postController.index);
router.put("/:id",checkAuthMiddleWare.checkAuth,postController.update);
router.delete("/:id",checkAuthMiddleWare.checkAuth,postController.destroy);
// router.get("/post",postController.post);

module.exports= router;