const { DataTypes } = require('sequelize');
const sequialize = require('../../../db/connectDB');


const Nodal=sequialize.define('nodal',{
    nodal_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    nodalname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    motherlab:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=Nodal;