const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const ColorMaster=sequalize.define('color',{
    color_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    color_status:{
        type:DataTypes.STRING,
        allowNull:false
    },
    color_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
});

module.exports=ColorMaster;