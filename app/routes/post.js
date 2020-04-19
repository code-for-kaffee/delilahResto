const router = require('express').Router();
const {checkUser, authenticateUser} = require('../controllers/post');

router.post('/login', checkUser);

router.post('/secure', authenticateUser, (req, res) => res.end());

module.exports = router;