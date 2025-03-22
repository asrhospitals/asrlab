const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');


const RoleType=sequalize.define('roletype',{
    roleType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roleDescription:{
        type:DataTypes.STRING,
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
       
});

module.exports=RoleType;