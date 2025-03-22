const { DataTypes } = require('sequelize');
const sequelize = require('../../../db/connectDB');

const DeparmentMaster = sequelize.define('departmentmaster', {
  dptName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = DeparmentMaster;