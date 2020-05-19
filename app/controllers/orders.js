const { sequelize } = require('../db/db')
const { QueryTypes } = require('sequelize');
const { authenticateUser, authenticateAdminUser } = require('../middleware/authenticationMiddleware');


module.exports.createOrder = async (req, res, next) => {
  try {
    
    const userId =await authenticateUser(req, res);
    const productsId = req.body.products_id;
    const orderId = await createOrder(userId);
    const newOrderId = orderId[0];
    const newOrder = await insertOrderProducts(newOrderId, productsId);
    
    console.log(newOrder)
    if(newOrder == false){
      res.status(403).json({error})
    }else{
   res.status(202).json({ message:"orden creada con exito" });  }
  } catch (error) {
    error
  }
  
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
   const adminUser = await authenticateAdminUser(req, res);
   const arr = []
   try {
    const orderId = req.params.id;
    const orders =  sequelize.query(
        `SELECT orders.user_id, orders.order_status, orders.pay_method, products.product_name, orders.order_id, orderproducts.quantity FROM orders
         INNER JOIN orderproducts
         ON orderproducts.order_id=orders.order_id
         INNER JOIN products
         ON products.product_id=orderproducts.product_id
         WHERE  orders.order_id=${orderId}`
         , { type: QueryTypes.SELECT });
        const {user_id, order_status, pay_method} = orders[0];
        orders.forEach(element => {
          arr.push(element.product_name+":"+ element.quantity)
        });
        if(userId === user_id || adminUser === true){
        const order= await {user_id:user_id, order_status:order_status, pay_method:pay_method, products_name:arr }
        return res.status(200).send( order  );
      }
    }
    catch(error) {
        error
}
}

module.exports.updateOrder = async (req, res) => {
    try {   
        const orderId = req.params.id;
        const orderStatus = req.body.order_status;
        const order = await sequelize.query(
            `UPDATE orders SET order_status='${orderStatus}' WHERE order_id=${orderId}
            `, { type: QueryTypes.UPDATE });
        if(order[0]!==false){
        return res.status(200).send({ message:`Orden actualizada correctamente, nuevo estado: ${order}` });
        }else{
          throw res.status(409).send({message: `No existe una orden con ID: ${orderId}`})}
        }
        catch(error) {
            error
    }
}
module.exports.deleteOrder = async (req, res) =>{
  try {
    const orderId = req.params.id;
    const order = await sequelize.query( `DELETE FROM orders WHERE order_id=${orderId}`, {type: QueryTypes.DELETE});
    console.log(order)
    res.status(203).json({ message: `La orden ${orderId} fue borrado con éxito` })
  } catch (error) {
    res.status(403).json({message: `No existe una orden con ese id`})
  }
}
 
  const createOrder = async (userId) => {
    const createOrder = sequelize.query(
      `INSERT INTO orders(user_id)
      VALUES('${userId}')`, { type: QueryTypes.INSERT});
      return createOrder;
      
  };
  
  const insertOrderProducts = async (orderId, productsId) => {
    try { 
    const insertOrderProduct = await productsId.forEach(productId => {
      sequelize.query(
        `INSERT INTO orderproducts(order_id, product_id, quantity)
        VALUES('${orderId}', ${productId.product_id}, '${productId.quantity}')`, { type: QueryTypes.INSERT});
    }); 
      return insertOrderProduct;
  } catch (error) {
      throw res.status(403).JSON({error: "por favor ingrese un id válido"})
  }
  
  };