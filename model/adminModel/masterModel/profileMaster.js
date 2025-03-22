const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const ProfileEntryMaster=sequalize.define('profileentry',{
    profileName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    profilecode:{
        type:DataTypes.STRING,
        allowNull:false
    },
    alternativebarcode:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=ProfileEntryMaster;