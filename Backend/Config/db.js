const{Sequelize} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME || 'products',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || 'root',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql'
    }
);

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch(err=>{
    console.error('Unable to connect to the database:',err);
});

module.exports = sequelize;

