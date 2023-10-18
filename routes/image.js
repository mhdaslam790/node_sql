const express = require('express');
const imageController = require('../controller/image_controller');
const imageUploader = require('../helpers/image_uploader.js');
const checkAuthMiddleWare = require('../middleware/check-auth.js');
const router = express.Router();

router.post('/uploads', checkAuthMiddleWare.checkAuth, imageUploader.upload.single('image'), imageController.upload);

module.exports =
    router
    ;