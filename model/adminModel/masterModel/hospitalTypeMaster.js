const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connectDB');

const HospipatlType=sequelize.define('hospitaltype',{
    hsptltype:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    hsptldsc:{
        type:DataTypes.STRING,
        allowNull:false
    }, 
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=HospipatlType;