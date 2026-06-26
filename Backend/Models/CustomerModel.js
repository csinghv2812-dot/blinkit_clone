const{DataTypes} = require('sequelize');
const sequelize = require('../Config/db');

const Customer = sequelize.define('Customer',{

    name:{
        type:DataTypes.STRING,
        allowNull: false,
    },
     email:{
        type:DataTypes.STRING,
        allowNull: false,
    },
     password:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    phone:{
        type:DataTypes.BIGINT,
        allowNull: true,},

     address:{
        type:DataTypes.STRING,
        allowNull: true,
    }
});

module.exports = Customer;