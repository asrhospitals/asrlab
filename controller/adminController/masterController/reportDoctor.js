const ReportDoctor=require('../../../model/adminModel/masterModel/reportDoctorMaster');
const multer = require("multer");
const express = require("express");


// Initialize Router
const router = express.Router();

// Configure Multer to Save Files Temporarily
// Configure Multer to Save Files Temporarily
const storage = multer.memoryStorage(); // Store file in memory (buffer)
const upload = multer({ storage: storage });


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
    const filePath = req.file.path;

    // Get image buffer from Multer
    let imageBuffer = null;
    if (req.file) {
      imageBuffer = req.file.buffer; 
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
        digitalSignature:imageBuffer,
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
