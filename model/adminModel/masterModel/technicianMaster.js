const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const Technician=sequalize.define('technician',{

    technicianName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    nodal:{
        type:DataTypes.STRING,
        allowNull:false
    },
    roleType:{
        type:DataTypes.STRING,
        allowNull:false
    },
    instrument:{
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
      dob: {
        type:DataTypes.DATE,
        allowNull:false
      },
      gender: {
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

module.exports=Technician;