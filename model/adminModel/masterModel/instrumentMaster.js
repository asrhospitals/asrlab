const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const InstrumentMaster=sequalize.define('instrumentmaster',{
    instrumentname:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    make:{
        type:DataTypes.STRING,
        allowNull:false
    },
    short_code:{
        type:DataTypes.STRING,
        allowNull:false
    },
    installDate:{
        type:DataTypes.DATE,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});
module.exports=InstrumentMaster;