const { DataTypes } = require('sequelize');
const sequialize = require('../../../db/connectDB');


const NodalInstrument=sequialize.define('nodalinstrument',{
    nodalname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    instrumentname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=NodalInstrument;