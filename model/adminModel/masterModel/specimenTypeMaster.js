const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const SpecimenTypeMaster=sequalize.define('specimen',{
    specimenname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    specimendes:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
});

module.exports=SpecimenTypeMaster;