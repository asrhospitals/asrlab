const { DataTypes } = require("sequelize");
const sequalize = require("../../../db/connectDB");

const LabtoLab = sequalize.define("labtolab", {
  labName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  addressLine: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pinCode: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  contactPerson: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isactive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports=LabtoLab;