module.exports= (sequelize, type) => {
    return sequelize.define('user',{
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: type.STRING,
        fullname: type.STRING,
        adress: type.STRING,
        email: type.STRING,
        phone_number: type.INTEGER

    })
}