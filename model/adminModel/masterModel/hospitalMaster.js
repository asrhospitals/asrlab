const { DataTypes } = require('sequelize');
const sequalize=require('../../../db/connectDB');
const Nodal=require('../masterModel/nodalMaster');

const Hospital=sequalize.define('hospitalmaster',{
    hospital_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    hospital_name:{
        type:DataTypes.STRING,
        allowNull:false
    },
    hsptltype:{
        type:DataTypes.STRING,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    city:{
        type:DataTypes.STRING,
        allowNull:false
    },
    district:{
        type:DataTypes.STRING,
        allowNull:false
    },
    pin:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    states:{
        type:DataTypes.STRING,
        allowNull:false
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false
    },
    phoneno:{
        type:DataTypes.STRING,
        allowNull:false
       
    },
    cntprsn:{
        type:DataTypes.STRING,
        allowNull:false
    },
    cntprsnmob:{
        type:DataTypes.INTEGER,
        allowNull:false
        
    },
    isactive:{
        type:DataTypes.BOOLEAN,
        allowNull:false
    }, 
    nodal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Nodal,
            key: "nodal_id",
        },
        onDelete: "CASCADE",
    },
},{
    timestamps: false,
  
  });

  /// Relation
  Hospital.belongsTo(Nodal,{foreignKey:'nodal_id'});
  Nodal.hasMany(Hospital,{foreignKey:'nodal_id'})


module.exports=Hospital;