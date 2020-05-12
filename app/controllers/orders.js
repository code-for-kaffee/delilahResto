const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');
 

module.exports.createOrder = async (req, res, next) => {
    const userId = req.body.user_id;
    const productsId = req.body.products_id;
    const orderId = await createOrder(userId);
    const newOrderId = orderId[0];
    const newOrder = await insertOrderProducts(newOrderId, productsId);
    console.log(newOrder)
   res.status(202).json({ message:"orden creada con exito" });  
    }

module.exports.addProductsToOrder = (req, res, next) => { 
 const insertOrderProduct = order.forEach(productId => {
    sequelize.query(
    `INSERT INTO orderproducts(order_id, product_id)
    VALUES('${orderId}', ${productId})`, { type: QueryTypes.INSERT});
        });
        return insertOrderProduct;
      
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
      console.log(orders);
    res.status(200).json({orders});
  };

module.exports.getOrderById = async (req, res) =>{
  try {   
    const orderId = req.params.id;
    const orders = await sequelize.query(
        `SELECT orders.user_id, orders.order_status, orders.pay_method, products.product_name FROM orders
         INNER JOIN orderproducts
         ON orderproducts.order_id=orders.order_id
         INNER JOIN products
         ON products.product_id=orderproducts.product_id
         WHERE user_id=${orderId}
         `, { type: QueryTypes.SELECT });
        const response = orders;
        return res.status(200).send({ response }); 
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
        const response = orders;
        return res.status(200).send({ message:"Order updated!" }); 
        
        }
        catch(error) {
            error
    }
}

// REVISAR

 
  const createOrder = async (userId) => {
    const createOrder = sequelize.query(
      `INSERT INTO orders(user_id)
      VALUES('${userId}')`, { type: QueryTypes.INSERT});
      return createOrder;
      
  };
  
  const selectLastOrder = (userId) => {
    const lastOrder = sequelize.query(`SELECT order_id FROM orders WHERE user_id=${userId} ORDER BY order_id DESC;`);
    return lastOrder;
  };
  
  const insertOrderProducts = (orderId, productsId) => {
    const insertOrderProduct = productsId.forEach(productId => {
      sequelize.query(
        `INSERT INTO orderproducts(order_id, product_id)
        VALUES('${orderId}', ${productId})`, { type: QueryTypes.INSERT});
    });
    return insertOrderProduct;
  };