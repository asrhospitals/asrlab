require('dotenv').config(); 
const ReportDoctor=require('../../../model/adminModel/masterModel/reportDoctorMaster');
const multer = require("multer");
const express = require("express");
const router = express.Router();
const {S3Client,PutObjectCommand}=require("@aws-sdk/client-s3");
const { v4: uuidv4 } = require('uuid');


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


/// Add Report Doctor

router.post("/add-reportdoctor", upload.single("digitalsignature"), async (req, res) => {
  try {
    const {
      doctorName,
      dob,
      gender,
      phoneNo,
      addressLine1,
      city,
      state,
      pin,
      aptNo,
      department,
      email,
      medicalRegNo,
      isactive
    } = req.body;

    // Get image buffer from Multer
       // Handle file upload to S3 (or your preferred cloud storage)
       let fileUrl = null;
       if (req.file) {
         const fileKey = `signature/${uuidv4()}-${req.file.originalname}`;
         
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

    const newReportDoctor=await ReportDoctor.create({ 
        doctorName,
        dob,
        gender,
        phoneNo,
        addressLine1,
        city,
        state,
        pin,
        aptNo,
        department,
        email,
        medicalRegNo,
        isactive,    
        digitalSignature:fileUrl,
    });

    // Response
    res.status(201).json({
      message: "Report Doctor registered successfully!",
      data: newReportDoctor
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
});

/// Get Report Doctor

router.get('/get-reportdoctor',async (req,res) => {
  try {
    const fetchReportDoctor=await ReportDoctor.findAll();
    res.status(200).json(fetchReportDoctor);
  } catch (error) {
    res
    .status(400)
    .json({ message: "Something went wrong", error: error.message });
  }
  
});

/// Update Report Doctor

router.put('/update-reportdoctor/:id', upload.single('digitalsignature'), async (req, res) => {
  try {
      const id = req.params.id;
      
      // Combine file path with other form data
      const updateData = {
          ...req.body,
          digitalsignature: req.file ? req.file.path : undefined
      };

     

      const [updateCount] = await ReportDoctor.update(updateData, {
          where: { id: id }
      });

      if (updateCount === 0) {
          return res.status(404).json({
              success: false,
              message: 'Record not found'
          });
      }

      const updatedRecord = await ReportDoctor.findByPk(id);

      return res.status(200).json({
          success: true,
          message: 'Updated successfully',
          data: updatedRecord
      });

  } catch (error) {
      console.error('Update error:', error);
      return res.status(500).json({
          success: false,
          message: 'Update failed',
          error: error.message
      });
  }
});

module.exports = router;
