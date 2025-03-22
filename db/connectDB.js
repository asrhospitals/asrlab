require('dotenv').config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_NAME, 'postgres', process.env.DATABASE_PASSWORD, {
    host: process.env.DATABASE_HOST,
    dialect: 'postgres',
    port: process.env.DATABASE_PORT || 5432,
    dialectOptions: { //< Add this
        ssl: {
           require: true,
           rejectUnauthorized: false
        }
     } 
  });

  

module.exports = sequelize;
