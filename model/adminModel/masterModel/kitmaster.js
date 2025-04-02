const { DataTypes } = require('sequelize');
const sequelize=require('../../../db/connectDB');

const KitMaster=sequelize.define('kit',{
    kit_id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    profilename:{
        type:DataTypes.STRING,
        allowNull:false
    },
    manufacture:{
        type:DataTypes.STRING,
        allowNull:false
    },
    kitname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    negetiveindex:{
        type:DataTypes.STRING,
        allowNull:false
    },
    boderlineindex:{
        type:DataTypes.STRING,
        allowNull:false
    },
    positiveindex:{
        type:DataTypes.STRING,
        allowNull:false
    },
    method:{
        type:DataTypes.STRING,
        allowNull:false
    },
    batchno:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    units:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    negetiveinterpret:{
        type:DataTypes.STRING,
        allowNull:false
    },
    borderlineinterpret:{
        type:DataTypes.STRING,
        allowNull:false
    },
    positiveinterpret:{
        type:DataTypes.STRING,
        allowNull:false
    }

});

module.exports=KitMaster;