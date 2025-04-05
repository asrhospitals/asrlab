const Router=require('express');
const router=Router();
const { addDepartment, getDepartment, updateDepartment } = require('../../controller/adminController/masterController/departmentMaster');
const { addSubDepartment, getSubDepartment, updateSubDepartment } = require('../../controller/adminController/masterController/subdepartmentMaster');
const { addhsptltype, gethsptltype, updatehsptltype } = require('../../controller/adminController/masterController/hospitaltypeMaster');
const { addhospital, gethospital, updatehospital } = require('../../controller/adminController/masterController/hospitalMaster');
const { addNodal, getNodal, updateNodal } = require('../../controller/adminController/masterController/nodalMaster');
const { addRole, getRole, updateRole } = require('../../controller/adminController/masterController/roletypeMaster');
const { addPhlebo, getPhlebo, updatePhlebo } = require('../../controller/adminController/masterController/phlebotomistMaster');
const { addReception, getReception, updateReception } = require('../../controller/adminController/masterController/receptionMaster');
const { addNodalHospital, getNodalHospital, updateNodalHospital } = require('../../controller/adminController/masterController/attachNodalHospital');
const { addlabtolab, getlabtolab, updatelabtolab } = require('../../controller/adminController/masterController/labtolabMaster');
const { addInstrument, getIntrument, updateIntrument } = require('../../controller/adminController/masterController/instrumentMaster');
const { addNodalInstrument, getNodalInstrument, updateNodalInstrument } = require('../../controller/adminController/masterController/attachedNodalInstrumentMaster');
const { addTechnician, getTechnician, updateTechnician } = require('../../controller/adminController/masterController/technicianMaster');
const { addRefDoctor, getRefDoc, updateRefDoc } = require('../../controller/adminController/masterController/referralMaster');
const { addProfile, getProfile, updateProfile } = require('../../controller/adminController/masterController/profileMaster');
const { addReport, getReport, updateReport } = require('../../controller/adminController/masterController/reportTypeMaster');
const { addSpecimen, getSpecimen, updateSpecimen } = require('../../controller/adminController/masterController/specimenMaster');
const { addTest, getTest, updateTest } = require('../../controller/adminController/masterController/testMaster');
const { addReagent, getReagent, updateReagent } = require('../../controller/adminController/masterController/reagentMaster');
const { addDocAuth, getDocAuth, updateDocAuth } = require('../../controller/adminController/masterController/doctorAuthMaster');
const { createProfile, fetchProfile, updateProfiles } = require('../../controller/adminController/masterController/profile');
const { addColor, getColor, updateColors } = require('../../controller/adminController/masterController/colormaster');
const { addKit, getKit, updateKit } = require('../../controller/adminController/masterController/kitmaster');
const { addReportDoctor, getReportDoctor, updateReportDoctor } = require('../../controller/adminController/masterController/reportDoctor');



/// ---------Department Master--------------
router.route('/add-department').post(addDepartment);
router.route('/get-department').get(getDepartment);
router.route('/update-department/:id').put(updateDepartment);

///---------- Subdepartment Master--------------
router.route('/add-subdepartment').post(addSubDepartment);
router.route('/get-subdepartment').get(getSubDepartment);
router.route('/update-subdepartment/:id').put(updateSubDepartment);

///------------ Hospital Type Master----------------
router.route('/add-hsptltype').post(addhsptltype);
router.route('/get-hsptltype').get(gethsptltype);
router.route('/update-hsptltype/:id').put(updatehsptltype);

///----------- Hospital Master---------------
router.route('/add-hospital').post(addhospital);
router.route('/get-hospital').get(gethospital);
router.route('/update-hospital/:id').put(updatehospital);

///--------------- Nodal Master--------------
router.route('/add-nodal').post(addNodal);
router.route('/get-nodal').get(getNodal);
router.route('/update-nodal/:id').put(updateNodal);

/// ------------Lab to Lab Master-----------
router.route('/add-labtolab').post(addlabtolab);
router.route('/get-labtolab').get(getlabtolab);
router.route('/update-labtolab/:id').put(updatelabtolab);

/// --------------Attach Nodal Hospital------------
router.route('/add-nodalhospital').post(addNodalHospital);
router.route('/get-nodalhospital').get(getNodalHospital);
router.route('/update-nodalhospital/:id').put(updateNodalHospital);

///---------------- Lab Instrument Master-----------
router.route('/add-instrument').post(addInstrument);
router.route('/get-instrument').get(getIntrument);
router.route('/update-instrument/:id').put(updateIntrument);

/// ---------------Attach Nodal Instrument Master--------------
router.route('/add-nodalinstrument').post(addNodalInstrument);
router.route('/get-nodalinstrument').get(getNodalInstrument);
router.route('/update-nodalinstrument/:id').put(updateNodalInstrument);

///---------------- Role Type Master------------------
router.route('/add-role').post(addRole);
router.route('/get-role').get(getRole);
router.route('/update-role/:id').put(updateRole);

///--------- Phlebotomist Master---------------
router.route('/add-phlebo').post(addPhlebo);
router.route('/get-phlebo').get(getPhlebo);
router.route('/update-phlebo/:id').put(updatePhlebo);

///----------- Reception Master-----------
router.route('/add-recep').post(addReception);
router.route('/get-recep').get(getReception);
router.route('/update-recep/:id').put(updateReception);

/// --------------Technician Master--------
router.route('/add-tech').post(addTechnician);
router.route('/get-tech').get(getTechnician);
router.route('/update-tech/:id').put(updateTechnician);

/// ------------Referral Doctor Master-----------
router.route('/add-refdoc').post(addRefDoctor);
router.route('/get-refdoc').get(getRefDoc);
router.route('/update-refdoc/:id').put(updateRefDoc);

/// ------------Report Doctor Master--------------
router.route('/add-reportdoctor').post(addReportDoctor);
router.route('/get-reportdoctor').get(getReportDoctor);
router.route('/update-reportdoctor/:id').put(updateReportDoctor);


/// --------------Profile Entry Master------------------
router.route('/add-profileentry').post(addProfile);
router.route('/get-profileentry').get(getProfile);
router.route('/update-profileentry/:id').put(updateProfile);

///---------- Profile Master------------
router.route('/add-profile').post(createProfile);
router.route('/get-profile').get(fetchProfile);
router.route('/update-profile/:id').put(updateProfiles);

///-----------Report Type Master--------------
router.route('/add-report').post(addReport);
router.route('/get-report').get(getReport);
router.route('/update-report/:id').put(updateReport);

///----------Reagent Master--------------
router.route('/add-reg').post(addReagent);
router.route('/get-reg').get(getReagent);
router.route('/update-reg/:id').put(updateReagent);

///----------- Investigation Master----------
router.route('/add-test').post(addTest);
router.route('/get-test').get(getTest);
router.route('/update-test/:id').put(updateTest);


///------------Specimen Type Master------------
router.route('/add-specimen').post(addSpecimen);
router.route('/get-specimen').get(getSpecimen);
router.route('/update-specimen/:id').put(updateSpecimen);

///-----------Color Master---------------------
router.route('/add-color').post(addColor);
router.route('/get-color').get(getColor);
router.route('/update-color/:id').put(updateColors);


///----------Kit Master----------------------
router.route('/add-kit').post(addKit);
router.route('/get-kit').get(getKit);
router.route('/update-kit/:id').put(updateKit);

///------------Doctor Authentication Master----------
router.route('/add-docauth').post(addDocAuth);
router.route('/get-docauth').get(getDocAuth);
router.route('/update-docauth/:id').put(updateDocAuth);

module.exports=router;