const HospipatlType=require('../../../model/adminModel/masterModel/hospitalTypeMaster');

/// Add Hospital Type Master
const addhsptltype = async (req, res) => {
  try {
    const newHospitalType= req.body;
    const createHospitalType=await HospipatlType.create(newHospitalType);
    res.status(201).json({message:'Created successfully',data:createHospitalType});
  } catch (error) {
    res.status(400).send({message:'Something went wrong',error:error.message});
  }
};

/// Get Hospital Type

const gethsptltype = async (req, res) => {
  try {
    const getHospitalType=await HospipatlType.findAll();
    res.status(200).json(getHospitalType);
  } catch (error) {
    res.status(400).send({message:'Something went wrong',error:error.message});
  }
};

/// Update Hospital Type

const updatehsptltype = async (req, res) => {
  try {

    const id = parseInt(req.params.id);
    const updateHospitalType=await HospipatlType.findByPk(id);
    updateHospitalType.update(req.body);
    res.status(200).json(updateHospitalType);

  } catch (error) {
    res.status(400).send({message:'Something went wrong',error:error.message});
  }
};

module.exports = { addhsptltype, gethsptltype ,updatehsptltype};
