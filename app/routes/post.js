const express = require('express');
const postController = require('../controllers/post')
const router = express.Router();

router.get('/login', postController.checkUser);

module.exports = router;