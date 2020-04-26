const router = require('express').Router();
const {checkUser, authenticateUser, registerUser} = require('../controllers/post');

router.post('/register', registerUser);

router.post('/login', checkUser);

router.post('/secure', authenticateUser, (req, res) => res.end());

router.get('/health', (req, res) => {
    res.status(200).send({ code: 'OK', message: `API up and running` });
  });

module.exports = router;