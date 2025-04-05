require('dotenv').config(); 
const ReportDoctor=require('../../../model/adminModel/masterModel/reportDoctorMaster');


/// Add Report Doctor
const addReportDoctor=async (req,res) => {
  try {
    const newReportDoctor = req.body;
    const createReportDoctor=await ReportDoctor.create(newReportDoctor);
    // Response
    res.status(201).json({
      message: "Report Doctor registered successfully!",
      data: createReportDoctor
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Something went wrong", error: error.message });
  }
}



/// Get Report Doctor

const getReportDoctor=  async (req,res) => {
  try {
    const fetchReportDoctor=await ReportDoctor.findAll();
    res.status(200).json(fetchReportDoctor);
  } catch (error) {
    res
    .status(400)
    .json({ message: "Something went wrong", error: error.message });
  }
  
}



/// Update Report Doctor

const updateReportDoctor=async (req, res) => {
  try {
      const id = req.params.id;
      const updatedRecord = await ReportDoctor.findByPk(id);
      updatedRecord.update(req.body);

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
}

module.exports = {addReportDoctor,getReportDoctor,updateReportDoctor};
