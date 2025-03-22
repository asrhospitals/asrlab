const SubDepartment=require('../../../model/adminModel/masterModel/subdptMaster');

/// Add Department
const addSubDepartment = async (req, res) => {
  try {
    const newSubdepartment=req.body;
    const createSubdepartment=await SubDepartment.create(newSubdepartment);
    res.status(201).json({message:'Created successfully',data:createSubdepartment});
  } catch (error) {
    res.status(400).send({message:'Something went wrong',error:error.message});
  }
};

/// Get All SubDepartment

const getSubDepartment = async (req, res) => {
  try {
    const newSubDepartment=await SubDepartment.findAll();
    res.status(200).json(newSubDepartment);
  } catch (error) {
    res.status(400).send({message:'Something went wrong',error:error.message});
  }
};

/// Update Department
const updateSubDepartment = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateSub=await SubDepartment.findByPk(id);
    updateSub.update(req.body);
    res.status(200).json(updateSub);
  } catch (error) {
    res.status(400).send({message:'Something went wrong',error:error.message});
  }
};

module.exports = { addSubDepartment, getSubDepartment, updateSubDepartment };
