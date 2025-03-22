const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');

const ReportType=sequalize.define('reporttype',{
    reporttype:{
        type:DataTypes.STRING,
        allowNull:false
    },
    reportdescription:{
        type:DataTypes.STRING,
        allowNull:false
    },
    entrytype:{
        type:DataTypes.STRING,
        allowNull:false
    },
    entryvalues:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        defaultValue:[]
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }
});
module.exports=ReportType;