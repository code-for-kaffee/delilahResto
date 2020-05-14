const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');
const { authenticateUser } = require('../middleware/authenticationMiddleware');


module.exports.createOrder = async (req, res, next) => {
    const userId = req.body.user_id;
    const productsId = req.body.products_id;
    const orderId = await createOrder(userId);
    const newOrderId = orderId[0];
    const newOrder = await insertOrderProducts(newOrderId, productsId);
    console.log(newOrder)
   res.status(202).json({ message:"orden creada con exito" });  
    }



module.exports.getOrders = async (req, res) => {
    
  const orders = await sequelize.query(
      `SELECT orders.order_id, orders.order_status, products.product_name FROM orders
      INNER JOIN clients
      ON orders.user_id=clients.user_id
      INNER JOIN orderproducts
      ON orderproducts.order_id=orders.order_id
      INNER JOIN products
      ON products.product_id=orderproducts.product_id
      `, { type: QueryTypes.SELECT });
      res.status(200).json({orders});
  };

module.exports.getOrderById = async (req, res) =>{
   const userId =await authenticateUser(req, res);
   const arr = []
   try {
    const orderId = req.params.id;
    const orders = await sequelize.query(
        `SELECT orders.user_id, orders.order_status, orders.pay_method, products.product_name FROM orders
         INNER JOIN orderproducts
         ON orderproducts.order_id=orders.order_id
         INNER JOIN products
         ON products.product_id=orderproducts.product_id
         WHERE ${orderId}  AND user_id=${userId}
         `, { type: QueryTypes.SELECT });
        const {user_id, order_status, pay_method} = orders[0];
        orders.forEach(element => {
          arr.push(element.product_name)
        });
        const order= await {user_id:user_id, order_status:order_status, pay_method:pay_method, products_name:arr }
        return res.status(200).send( order  ); 
    }
    catch(error) {
        error
}
}

module.exports.updateOrder = async (req, res, next) => {
    try {   
        const orderId = req.params.id;
        const orderStatus = req.body.order_status;
        const orders = await sequelize.query(
            `UPDATE orders SET order_status='${orderStatus}' WHERE order_id=${orderId}
            `, { type: QueryTypes.UPDATE });
        return res.status(200).send({ message:"Orden actualizada correctamente" }); 
        
        }
        catch(error) {
            error
    }
}
 
  const createOrder = async (userId) => {
    const createOrder = sequelize.query(
      `INSERT INTO orders(user_id)
      VALUES('${userId}')`, { type: QueryTypes.INSERT});
      return createOrder;
      
  };
  
  const insertOrderProducts = (orderId, productsId) => {
    const insertOrderProduct = productsId.forEach(productId => {
      sequelize.query(
        `INSERT INTO orderproducts(order_id, product_id)
        VALUES('${orderId}', ${productId})`, { type: QueryTypes.INSERT});
    });
    return insertOrderProduct;
  };