const { sequelize } = require('../db/db');
const { QueryTypes } = require('sequelize');

module.exports.addProducts = (req, res, next) => {
    let data = req;
    this.add = async () => {
        try {
            const product = data.body;
            await addProducts(product);
            const response = {
                estado: 'Producto agregado exitosamente!!'
            }
            return res.status(200).send({ code: 'OK', message: `${response.estado}` });;
        } catch (error) {
            throw res.status(409).send({ error: "Producto duplicado o inválido " })
        }
    };
   /*  const addProducts = (product) => {
        const productRegister = sequelize.query(
            `INSERT INTO products (product_name, stock, product_price) 
            VALUES('${product.product_name}', '${product.stock}', '${product.product_price}')`,
            { type: QueryTypes.INSERT });
        return productRegister; */
        const addProducts = async (product) => {
            const producto = product;
            if(producto.length > 1){
            for(let i = 0; i<producto.length; i++){
            var productRegister = await sequelize.query(
                `INSERT INTO products (product_name, stock, product_price) 
                VALUES('${producto[i].product_name}', '${producto[i].stock}', '${producto[i].product_price}')`,
                { type: QueryTypes.INSERT });
            }}else{
                var productRegister = sequelize.query(
                    `INSERT INTO products (product_name, stock, product_price) 
                    VALUES('${producto.product_name}', '${producto.stock}', '${producto.product_price}')`,
                    { type: QueryTypes.INSERT });
            }
            return productRegister;
        
    }
    this.add(data);

}

module.exports.getProductsList = async (req, res, next) => {
    try {
        const productsList = await sequelize.query('SELECT * FROM products', { type: QueryTypes.SELECT });
        const response = productsList;
        return res.status(200).send({ response })
    }
    catch (error) {
        return res.status(403).send({ Error: "No hay productos cargados" });

    }
}
module.exports.getProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await sequelize.query(`SELECT * FROM products WHERE product_id = ${productId}`, { type: QueryTypes.SELECT });
        const response = product;
        return res.status(200).send({ response });
    } catch (error) {
        return res.status(403).send({ Error: "El id de producto no existe" });

    }
}
module.exports.deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        await sequelize.query(`DELETE FROM products WHERE product_id = ${productId}`, { type: QueryTypes.DELETE });
        return res.status(200).send(`El producto fue eliminado correctamente`)
    } catch (error) {
        return res.status(403).send({ Error: "El id de producto no existe" });
    }

}

module.exports.updateProduct = async (req, res) => {
    try {
        const updateParams = req.body;
        const productId = req.params.id;
        for (prop in updateParams){
            await sequelize.query(`UPDATE products SET ${prop} = '${updateParams[prop]}'  WHERE product_id = ${productId}`, { type: QueryTypes.UPDATE });}
        return res.status(200).send(`Product updated!`);
    } catch (error) {
        error
    }
}