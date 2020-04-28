const router = require('express').Router();
const {loginUser, authenticateUser, registerUser, verifyToken} = require('../controllers/accounts');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.post('/secure', authenticate, (req, res) => res.end());

router.get('/health', (req, res) => {
    res.status(200).send({ code: 'OK', message: `API up and running` });
  });

module.exports = router;