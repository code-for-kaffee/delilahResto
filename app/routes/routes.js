const router = require('express').Router();
const { loginUser, registerUser, getUsers } = require('../controllers/accounts');
const { addProducts, getProductsList, deleteProduct, updateProduct, getProduct } = require('../controllers/products');
const { authenticate } = require('../middleware/authenticationMiddleware');
const { getOrders, updateOrder, createOrder, getOrderById, deleteOrder } = require('../controllers/orders');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users/:id',authenticate, getUsers)

router.post('/products', authenticate, addProducts);
router.get('/products',  getProductsList);
router.get ('/products/:id', getProduct)
router.put('/products/:id', authenticate, updateProduct);
router.delete('/products/:id', authenticate,  deleteProduct);

router.get('/orders',authenticate, getOrders);
router.get('/orders/:id', getOrderById)
router.post('/orders', createOrder);
router.put('/orders/:id',authenticate, updateOrder);
router.delete('/orders/:id',authenticate, deleteOrder)

module.exports = router;