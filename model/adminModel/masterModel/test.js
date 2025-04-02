const { DataTypes, STRING } = require("sequelize");
const sequalize = require("../../../db/connectDB");

const PatientTest = sequalize.define("test", {
  test_id:{
    type:DataTypes.INTEGER,
    primaryKey:true,
    autoIncrement:true
  },
  department: {
    type: DataTypes.STRING,
  },
  subdivision: {
    type: DataTypes.STRING,
  },
  testname: {
    type: DataTypes.STRING,
    allowNull:false
  },
  aliasname: {
    type: DataTypes.STRING,
    allowNull:true
  },
  testcode:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  shortcode:{
    type:DataTypes.INTEGER,
    allowNull:false
  },
  roletype:{
    type:DataTypes.INTEGER,
    allowNull:false
  },

  /// cost of Test
  patient:{
    type:DataTypes.STRING,
    allowNull:false
  },
  drref:{
    type:DataTypes.INTEGER
  },
  labtolab:{
    type:DataTypes.INTEGER
  },
  walkin:{
    type:DataTypes.INTEGER
  },
  reporttype:{
    type:DataTypes.STRING,
    allowNull:false
  },
  mesuringunit:{
    type:DataTypes.STRING
  },
  refrange:{
    type:DataTypes.STRING,
    allowNull:false
  },
  tat:{
    type:DataTypes.STRING,
    allowNull:false
  },
  dieases:{
    type:DataTypes.STRING
  },
  testdone:{
    type:DataTypes.STRING
  },
  specimentyepe:{
    type:DataTypes.STRING
  },
  volume:{
    type:DataTypes.STRING
  },
  tubecolor:{
    type:DataTypes.STRING
  },
  hospitaltype:{
    type:DataTypes.STRING
  },
  testcategory:{
    type:DataTypes.STRING
  },
  processingcenter:{
    type:DataTypes.STRING,
    allowNull:false
  },
  accredationname: {
    type: DataTypes.STRING,
  },
  accredationdate: {
    type: DataTypes.DATE,
  },
});

module.exports=PatientTest;
