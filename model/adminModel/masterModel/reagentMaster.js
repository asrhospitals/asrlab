const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connectDB');

const Reagent=sequelize.define('reagent',{
    reagentname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    capacity:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=Reagent;