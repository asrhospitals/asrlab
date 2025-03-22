const Router=require('express');
const { registration, login, verifyOtp, resendOtp } = require('../../controller/authenticationController/authenticationController');
const router=Router();

/// Authentication Routes
router.route("/create-user").post(registration);
router.route("/signin").post(login);
router.route("/verifyotp").post(verifyOtp);
router.route("/resendotp/:userid").post(resendOtp);

module.exports=router;