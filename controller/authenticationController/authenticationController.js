const User=require("../../model/authModel/authenticationModel/userModel");
const bcrypt=require('bcryptjs');
const jwt=require("jsonwebtoken");
const { generateOtp,sendOtp } = require("../authenticationController/otpController");
const OTP=require("../../model/authModel/authenticationModel/otpModel");
const Hospital=require('../../model/adminModel/masterModel/hospitalMaster');
const Nodal = require("../../model/adminModel/masterModel/nodalMaster");



/// Register user

const registration = async (req, res) => {
    try {
        const { username, password, role, hospital_id,nodal_id, module, firstName, lastname, menuexpand, isactive } = req.body;

        // Ensure that the hospital exists for non-admin users
        if (role !== 'admin') {
            const hospital = await Hospital.findOne({ where: { hospital_id } });
            if (!hospital) {
                return res.status(404).json({ message: "Hospital not found" });
            }
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = await User.create({
            username,
            password: hashedPassword,
            role,
            hospital_id: role !== 'admin' ? hospital_id : null, // Admins don't belong to a hospital
            nodal_id:role !=='admin'? nodal_id:null,
            module,
            firstName,
            lastname,
            menuexpand,
            isactive,
        });

        res.status(201).json({ message: "User Registered Successfully", user: newUser });
    } catch (e) {
        console.log(e.message);
        res.status(400).json({ message: "User Registration Failed" });
    }
};





/// Login User
const login = async (req, res) => {
  try {
      const { username, password } = req.body;

      // Find user
      const user = await User.findOne({
        where: { username },
        include: [
          {
            model: Hospital,
            attributes: ['hospital_id', 'hospital_name'] // Fetch only hospital_id and name
          },
          {
            model:Nodal,
            attributes:['nodal_id','nodalname']
          }
        ]
      }); 
      if (!user) return res.status(404).json({ message: "No User found" });

      // Compare password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

      // Handle Admin Users
      if (user.role === 'admin') {
          const otp = generateOtp();
          await OTP.create({ user_id: user.user_id, otp, expires_at: new Date(Date.now() + 10 * 60 * 1000) });
          await sendOtp(process.env.PREDEFINED_EMAIL, otp);
          return res.status(200).json({ message: "OTP sent to email", id: user.user_id, otp,role:user.role });
      }

      // Handle Non-Admin Users (Require Hospital Verification)
      if (!user.hospital_id && !user.nodal_id) {
          return res.status(403).json({ message: "Access denied: No hospital or Nodal assigned" });
      }

      const token = jwt.sign(
          { id: user.user_id, role: user.role, hospital_id: user.hospital_id,nodal_id:user.nodal_id },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
      );
      
      

      return res.status(200).json({
          success: true,
          token,
          id: user.user_id,
          role: user.role,
          hospital_id: user.hospital_id,
          nodal_id:user.nodal_id,
          //Need to Get Hospital Name as per Hospital ID
          hospital_name: user.hospitalmaster ? user.hospitalmaster.hospital_name : "Unknown Hospital",
          // Nodal Data
          nodalname: user.nodal ? user.nodal.nodalname : "Unknown Nodal",

           //Need to Get User Name as per User ID
          username: user.firstName + " " + user.lastname

          
      });
  } catch (e) {
    return res.status(403).json({
        success: false,
        error: e.message,
    });
  }
};



/// Verify OTP

const verifyOtp = async (req, res) => {
    try {
        const { userid, otp } = req.body;

         // Fetch the user based on userId
         const user = await User.findByPk(userid);
         if (!user) return res.status(404).json({ message: 'User not found' });

        // Check if the OTP exists and matches
        const storedOtp = await OTP.findOne({where:{ otp }});
        if (!storedOtp) return res.status(400).json({ message: 'Invalid or expired OTP' });

        // OTP is valid; delete it after successful verification
        await OTP.destroy({ where: { id: storedOtp.id } });

        // Generate the JWT token with the user's ID and role
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "OTP verified, login successful", token });
    } catch (e) {
        res.status(500).json({ message: 'OTP Verification Failed' });
    }
};

/// Resend OTP
const resendOtp = async (req, res) => {
    try {
        // Get userid from URL parameters
        const { userid } = req.params;

        // Find the user
        const user = await User.findByPk(userid);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate a new OTP
        const otp = generateOtp();

        // Update OTP in the database (delete old, create new)
        await OTP.destroy({ where: { userid: userid } }); // Delete existing OTP
        await OTP.create({ userid: userid, otp });

        // Send OTP to predefined email
        await sendOtp(process.env.PREDEFINED_EMAIL, otp);

        // Success response
        res.status(200).json({ message: 'OTP resent successfully' });
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'Failed to resend OTP' });
    }
};




module.exports={registration,login,verifyOtp,resendOtp}