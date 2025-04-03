const Router=require('express');
const { addPatient } = require('../../controller/patientRegistrationController/patientRegistrationController');
const router=Router();

// Add Patients
router.route('/add-patient').post(addPatient);



module.exports=router;