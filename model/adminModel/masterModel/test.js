const { DataTypes } = require("sequelize");
const sequalize = require("../../../db/connectDB");

const Test = sequalize.define("test", {
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shortname: {
    type: DataTypes.STRING,
  },
  department: {
    type: DataTypes.STRING,
  },
  sample: {
    type: DataTypes.STRING,
  },
  samplequantity: {
    type: DataTypes.STRING,
  },
  sampletemp: {
    type: DataTypes.STRING,
  },
  method: {
    type: DataTypes.STRING,
  },
  instrumenttype: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.STRING,
  },
  sac: {
    type: DataTypes.STRING,
  },
  container: {
    type: DataTypes.STRING,
  },
  separatePrint: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  qcode: {
    type: DataTypes.STRING,
  },
  labRegNo: {
    type: DataTypes.STRING,
  },
  noHeaderReport: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enableAutoEmailAtApproval: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enableAutoSMSAtApproval: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enableAutoWhatsappAtApproval: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enableIntermediateResultApproval: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  enableNoIntermediateResult: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  ///Result
  resultname: {
    type: DataTypes.STRING,
  },
  resultnamelang: {
    type: DataTypes.STRING,
  },
  extresultid: {
    type: DataTypes.STRING,
  },
  order: {
    type: DataTypes.STRING,
  },
  unit: {
    type: DataTypes.STRING,
  },
  formula: {
    type: DataTypes.STRING,
  },
  valuetype: {
    type: DataTypes.STRING,
  },
  defaultvalue: {
    type: DataTypes.STRING,
  },
  roundof: {
    type: DataTypes.INTEGER,
  },
  outsourcinglab: {
    type: DataTypes.STRING,
  },
  outsrclabprice: {
    type: DataTypes.DOUBLE,
  },
  accredationname: {
    type: DataTypes.STRING,
  },
  accredationdate: {
    type: DataTypes.DATE,
  },
  addconsumable: { type: DataTypes.STRING },
  addquantity: { type: DataTypes.INTEGER },
  barcodelength: { type: DataTypes.INTEGER, allowNull: false },
  tat: { type: DataTypes.INTEGER, allowNull: false },
  stat: { type: DataTypes.INTEGER },
  isactive: { type: DataTypes.BOOLEAN, allowNull: false },
  instruction: { type: DataTypes.STRING },
  interpretation: { type: DataTypes.STRING },
  remarks: { type: DataTypes.STRING },
  testprice: { type: DataTypes.DOUBLE, allowNull: false },
});

module.exports=Test;
