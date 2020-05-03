const router = require('express').Router();
const {loginUser, authenticate, registerUser, verifyToken} = require('../controllers/accounts');
const {addProducts, getProductsList, deleteProduct, updateProduct, getProduct} = require('../controllers/products')

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/login/secure', authenticate, (req, res) => res.send({code: 'OK', message: `This is a secure page` }));

router.post('/products', addProducts);
router.get('/products',  getProductsList);
router.get ('/products/:id', getProduct)
router.put('/products/:id', updateProduct);
router.delete('/products/:id' ,  deleteProduct);

module.exports = router;