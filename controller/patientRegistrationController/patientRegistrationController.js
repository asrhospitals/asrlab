require('dotenv').config(); 
const Patient = require("../../model/patientRegistrationModel/patientRegistrationModel"); 
const multer = require("multer");
const express = require("express");
const { Op } = require("sequelize");
const Hospital=require('../../model/adminModel/masterModel/hospitalMaster');
const verifyToken=require("../../middlewares/authMiddileware");
const role=require("../../middlewares/roleMiddleware");
const { v4: uuidv4 } = require('uuid');
const router = express.Router();
const {S3Client,PutObjectCommand}=require("@aws-sdk/client-s3");






// Configure AWS S3 (or equivalent cloud storage)
const s3 = new S3Client({
    region: 'ap-south-1',
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// Configure Multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB limit
});


/// Add Patient Details
router.post(
  "/add-patient",
  verifyToken,
  role("phlebotomist"),
 upload.single("attatchfile"),
  async (req, res) => {
    try {
      // Extract user details from token
      const { id: user_id, hospital_id } = req.user;
      if (!hospital_id) {
        return res.status(400).json({ message: "Hospital ID is missing in token" });
      }

      // Ensure hospital exists
      const hospital = await Hospital.findOne({ where: { hospital_id } }); 
      if (!hospital) {
        return res.status(404).json({ message: "Invalid hospital" });
      }
      const {
        patient_name,
        gurdian_name,
        patient_age,
        patient_gender,
        patient_barcode,
        refdoc,
        area,
        city,
        district,
        patient_op,
        patient_opno,
        patient_regdate,
        patient_mobile,
        whatsappnumber,
        emailid,
        trfno,
        remark,
      } = req.body;

      // Handle file upload to S3 (or your preferred cloud storage)
      let fileUrl = null;
      if (req.file) {
        const fileKey = `patients/${hospital_id}/${uuidv4()}-${req.file.originalname}`;
        
        const uploadParams = {
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: fileKey,
          Body: req.file.buffer,
          ContentType: req.file.mimetype,
        };
        
        // Upload to S3 using SDK v3 method
        const command = new PutObjectCommand(uploadParams);
        await s3.send(command);
        
        // Generate URL (S3 v3 doesn't return URL directly)
        fileUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.${'ap-south-1'}.amazonaws.com/${fileKey}`;
      }
            
     
 
      // Create Patient Registration
      const createPatient = await Patient.create(
        {
        patient_name,
        gurdian_name,
        patient_age,
        patient_gender,
        patient_barcode,
        refdoc,
        area,
        city,
        district,
        patient_op,
        patient_opno,
        patient_regdate,
        patient_mobile,
        whatsappnumber,
        emailid,
        trfno,
        remark,
        attatchfile :fileUrl,
        hospital_id,  
        created_by: user_id, 
        
      },);
      // Send response with hospital name
      res.status(201).json({
        message: "Patient registered successfully!",
        data: createPatient,
        hospital_name: hospital.hospital_name, 
      });

    } catch (error) {
      res.status(403).json({
        message: "Patient registration failed",
        error: error.message, 
      });
      console.log(error);
      
    }
  }
);



// Get Patient Details by Hospital
router.get("/get-patient/:hospital_name",verifyToken,role("reception","phlebotomist"), async (req, res) => {
  try {
    /// Get Extract URL of hospital
    const { hospital_name } = req.params;
    // Get current date in 'YYYY-MM-DD' format
    // const currentDate = new Date().toLocaleDateString("en-CA");
    const currentDate = new Date().toLocaleString("en-CA", { timeZone: "Asia/Kolkata" }).split(",")[0];
   //Get Hospital Details    
    const hospital = await Hospital.findOne({ where: { hospital_name } });
    if (!hospital) {
      return res.status(404).json({ message: 'Hospital not found' });
    } 
    ///Get all Patients details by Hospital Name and Current Date  
    const fetchPatients = await Patient.findAll({
        where: { patient_regdate: currentDate,hospital_id: hospital.hospital_id},
        include: [
          { model: Hospital,attributes: ['hospital_name'] }
        ]
      });

    /// Checks if there is no data according to that hospital name
    if (fetchPatients.length === 0) {
      return res
        .status(200)
        .json({ message: "No data available" });
    } 

    res.status(200).json({data: fetchPatients, hospital_name: hospital.hospital_name});
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
});



/// Get Search PPP Patients details by barcode, date and name
router.get("/search-patient", verifyToken,role("reception","phlebotomist"),async (req, res) => {
  try {
    ///Get Barcode and Date for Search Patient Data
    const { patient_barcode, startDate, endDate,patient_name,hospital_id } = req.query;

 // Ensure hospital_id is provided
 if (!hospital_id) {
  return res.status(400).json({ message: "Hospital ID is required" });
}

// Find hospital
const hospital = await Hospital.findOne({ where: { hospital_id } });
if (!hospital) {
  return res.status(404).json({ message: "Hospital not found" });
}

// Build query conditions dynamically
const whereConditions = { hospital_id: hospital.hospital_id };

    // Search by Barcode
    if (patient_barcode) {
      
      whereConditions.patient_barcode={ [Op.iLike]: `%${patient_barcode}%` } // Use `Op.iLike` for case-insensitive search
    }

    // Search by Name (Case-insensitive)
    if (patient_name) {
      whereConditions.patient_name = { [Op.iLike]: `%${patient_name}%` }; // Use `Op.iLike` for case-insensitive search
    }

    // Search by Date Range
    if (startDate && endDate) {
      whereConditions.patient_regdate = {
        [Op.between]: [
          new Date(startDate + "T00:00:00Z"),
          new Date(endDate + "T23:59:59Z"),
        ],
      };
    }
    // Fetch patients
    const fetchPPP = await Patient.findAll({
      where: whereConditions,
      include: [{ model: Hospital, attributes: ["hospital_name"] }],
    });

    // Check if no data found
    if (!fetchPPP.length) {
      return res.status(404).json({ message: "No data found" });
    }

    // Return results
    return res.status(200).json({
      success: true,
      count: fetchPPP.length,
      data: fetchPPP,
    });

  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error: error.message });
  }
});

// /// Update PPP Details
router.put('/update-patients/:id',upload.single("attatchfile"),async (req,res) => {
  
  try {
    const id=req.params.id;
     const updateData = {
              ...req.body,
              attatchfile: req.file ? req.file.path : undefined
          };

          const [updateCount] = await Patient.update(updateData, {
            where: { id: id }
        });
  
        if (updateCount === 0) {
            return res.status(404).json({
                success: false,
                message: 'Record not found'
            });
        }
    const updatePatient=await Patient.findByPk(id);
    return res.status(200).json({
      success: true,
      message: 'Updated successfully',
      data: updatePatient
  });
  } catch (error) {
    res
    .status(500)
    .json({ message: "Something went wrong", error: error.message });
  }
});



/// Update Patient Status
// Define role-based status transitions
const ROLE_STATUS_MAP = {
  "phlebotomist": "Phlebotomist",
  "receptionist": "Reception",
  "technician": "Technician",
  "doctor": "Doctor"
};

// Define next status based on current status
const NEXT_STATUS = {
  "Phlebotomist": "Reception",
  "Reception": "Technician",
  "Technician": "Doctor"
};

router.put("/update-status", verifyToken,role("phlebotomist","reception","technician","doctor"), async (req, res) => {
  try {
      const { hospital_id, patient_ids } = req.body;
      const user_id = req.user.user_id;
      const user_role = req.user.role; // Assuming the role is in the token
      
      // Check if user role is valid for status updates
      if (!ROLE_STATUS_MAP[user_role]) {
          return res.status(403).json({ message: "Your role cannot update patient status" });
      }

      // Determine which status the user can update from
      const currentStatus = ROLE_STATUS_MAP[user_role];
      
      // Determine the next status
      const nextStatus = NEXT_STATUS[currentStatus];
      
      // If there's no next status for this role, they can't update
      if (!nextStatus) {
          return res.status(403).json({ message: "Your role cannot update patient status further" });
      }
      
      if (!Array.isArray(patient_ids) || patient_ids.length === 0) {
          return res.status(400).json({ message: "Invalid patient_ids array" });
      }
      
      // Fetch patients with the current status that matches the user's role
      const patients = await Patient.findAll({
          where: { 
              patient_id: { [Op.in]: patient_ids }, 
              hospital_id,
              patient_data_status: currentStatus
          },
          attributes: ["patient_id", "patient_data_status"]
      });
      
      if (patients.length === 0) {
          return res.status(404).json({ 
              message: `No patients found in '${currentStatus}' status for the given hospital.` 
          });
      }
      
      // Collect patient IDs that will be updated
      const patientIdsToUpdate = patients.map(patient => patient.patient_id);
      
      // Find which requested patients were not in the correct status
      const invalidPatientIds = patient_ids.filter(id => !patientIdsToUpdate.includes(id));
      
      // Perform bulk update
      await Promise.all(
          patientIdsToUpdate.map(patient_id =>
              Patient.update(
                  { patient_data_status: nextStatus },
                  { where: { patient_id } }
              )
          )
      );
            
      res.status(200).json({
          message: `Updated ${patientIdsToUpdate.length} patient(s) from '${currentStatus}' to '${nextStatus}'`,
          updated_patients: patientIdsToUpdate,
          invalid_patients: invalidPatientIds.length > 0 ? invalidPatientIds : [],
          updated_by: user_id,
          updated_by_role: user_role
      });
  } catch (error) {
      console.error("Error updating patient status:", error);
      res.status(500).json({ message: "Error updating patient status", error: error.message });
  }
});




module.exports = router;
