const { DataTypes } = require("sequelize");
const sequalize = require("../../../db/connectDB");

const Phlebotomist = sequalize.define("phlebotomist", {
  phleboName: {
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
  

  dob: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  contactNo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nodal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospital: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

module.exports = Phlebotomist;
