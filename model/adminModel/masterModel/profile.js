const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connectDB');


const Profile=sequelize.define('profile',{
    profile_entry:{
        type:DataTypes.STRING,
        allowNull:false
    },
    investigation_name:{
        type:DataTypes.ARRAY(DataTypes.STRING),
        allowNull:false,
        defaultValue: []
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }

})

module.exports=Profile