const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connectDB');

const SubdepartmentMaster=sequelize.define('subdepartment',{
    dptName:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    subDptName:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
    },
    isActive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});

module.exports=SubdepartmentMaster;