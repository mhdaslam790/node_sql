const express = require('express');
 const postController = require('../controller/post_controller.js');


const router = express.Router();

router.post("/create",postController.save);
router.get("/:id",postController.show);
router.get("/",postController.index);
router.put("/:id",postController.update);
router.delete("/:id",postController.destroy);
// router.get("/post",postController.post);

module.exports= router;