const sequelize=require('../../db/connectDB');
const Patient=require('../patientRegistrationModel/patientRegistrationModel');
const Test=require('../adminModel/masterModel/test');
const Profile=require('../../model/adminModel/masterModel/profile')
const { DataTypes } = require('sequelize');

const PatientTestArchive=sequelize.define('patienttestarchive',{
    patient_test_archive_id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },

    patient_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Patient,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    test_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Test,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    profile_entry_id:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references: {
            model: Profile,
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    batch:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    sample_received_physically:{
        type:DataTypes.ENUM('Y','N'),
        allowNull:false,
        defaultValue:'N'

    },
    rejection_reason:{
        type:DataTypes.STRING
    },
    make_slide:{
        type:DataTypes.ENUM('NONE','YES','NO'),
        defaultValue:'NONE'
    },
    status: {
        type: DataTypes.ENUM('node','center','motherlab','technician','doctor','pending','accept','redo','reject','recollect','docpending'),
        allowNull: false,
        defaultValue: 'center'
    }

});

/// Relationship
Patient.hasMany(PatientTestArchive,{foreignKey:'patient_id'});
Test.hasMany(PatientTestArchive,{foreignKey:'test_id'});
PatientTestArchive.belongsTo(Patient,{foreignKey:'patinet_id'});
PatientTestArchive.belongsTo(Test,{foreignKey:'test_id'});
PatientTestArchive.belongsTo(Profile,{foreignKey:'profile_entry_id'});



module.exports=PatientTestArchive;