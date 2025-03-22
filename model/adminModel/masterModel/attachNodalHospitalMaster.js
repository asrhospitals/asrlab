const { DataTypes } = require('sequelize');
const sequialize = require('../../../db/connectDB');


const NodalHospital=sequialize.define('nodalhospital',{
    nodalname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    hospitalname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=NodalHospital;