const { DataTypes } = require("sequelize");
const sequelize = require("../../db/connectDB");
const Hospital = require("../adminModel/masterModel/hospitalMaster");
const User = require("../authModel/authenticationModel/userModel");

const Patient = sequelize.define("patient", {
  patient_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  patient_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  gurdian_name: {
    type: DataTypes.STRING,
  },
  patient_age: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patient_gender: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patient_barcode: {
    type: DataTypes.STRING, 
    allowNull: false,
    unique: true,
  },
  refdoc: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  area: {
    type: DataTypes.STRING,
  },
  city: {
    type: DataTypes.STRING,
  },
  district: {
    type: DataTypes.STRING,
  },
  patient_op: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patient_opno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  patient_regdate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  patient_mobile: {
    type: DataTypes.STRING, 
  },
  whatsappnumber: {
    type: DataTypes.STRING,
  },
  emailid: {
    type: DataTypes.STRING,
  },
  trfno: {
    type: DataTypes.STRING, 
    allowNull: false,
  },
  remark: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  attatchfile: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hospital_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Hospital,
      key: "hospital_id",
    },
  },
  created_by: {
    type: DataTypes.INTEGER, 
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
  },

  /// Patient Status Data, Must Be ENUM
  patient_data_status: {
     type: DataTypes.ENUM,
     values:['Phlebotomist', 'Reception','Technician','Doctor'],
     defaultValue: 'Phlebotomist',
}

  }, {
  timestamps: false,

});

/// Relationship
Patient.belongsTo(Hospital, { foreignKey: "hospital_id" });
Hospital.hasMany(Patient, { foreignKey: "hospital_id" });

Patient.belongsTo(User, { foreignKey: "created_by" });
User.hasMany(Patient, { foreignKey: "created_by" });

module.exports = Patient;
