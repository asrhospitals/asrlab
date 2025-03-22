const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const ReferralDoctor=sequalize.define('referaldoctor',{
    refDoctorName: {
        type:DataTypes.STRING,
        allowNull:false
      },
      addressLine: {
        type:DataTypes.STRING,
        allowNull:false
      },
      city: {
        type:DataTypes.STRING,
        allowNull:false
      },
      state: {
        type:DataTypes.STRING,
        allowNull:false
      },
      pinCode: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
    
      qualification: {
        type:DataTypes.STRING,
        allowNull:false
      },
      email: {
        type:DataTypes.STRING,
       
      },
      ttm: {
        type:DataTypes.STRING,
        allowNull:false
      },
      gender: {
        type:DataTypes.STRING,
        allowNull:false
      },
      hospital: {
        type:DataTypes.STRING,
        allowNull:false
      },
      contactNo: {
        type:DataTypes.STRING,
        allowNull:false
      },
      isactive: {
        type:DataTypes.BOOLEAN,
        allowNull:false
      },
    });

    module.exports=ReferralDoctor;
