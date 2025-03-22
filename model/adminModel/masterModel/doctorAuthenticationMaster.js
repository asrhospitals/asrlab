const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const DoctorAuth=sequalize.define('docauth',{
    hospitalname:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dptname:{
        type:DataTypes.STRING,
    },
    doctors:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false,
        defaultValue: []
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false

    }
});

module.exports=DoctorAuth;