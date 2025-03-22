const { DataTypes } = require('sequelize');
const sequelize=require('../../../db/connectDB');

const ReportDoctor=sequelize.define('reportdoctor',{
    doctorName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    gender:{
        type:DataTypes.STRING,
        allowNull:false
    },
    dob:{
        type:DataTypes.DATEONLY,
        allowNull:false
    },
    phoneNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    addressLine1:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    state:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pin:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    aptNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    department:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,

    },
    medicalRegNo:{
        type:DataTypes.STRING,
        allowNull:false
    },
    digitalSignature:{
        type:DataTypes.BLOB('tiny'),
        allowNull:false
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }

});

module.exports=ReportDoctor;