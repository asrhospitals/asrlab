const DoctorAuth=require('../../../model/adminModel/masterModel/doctorAuthenticationMaster');

/// Add DocAuth
const addDocAuth=async (req,res) => {
    try {
        const newDocAuth=req.body;
        const createDocAuth=await DoctorAuth.create(newDocAuth);
        res.status(201).json(createDocAuth);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

/// Get DocAuth
const getDocAuth=async (req,res) => {
    try {
        const getDocauth=await DoctorAuth.findAll();
        res.status(200).json(getDocauth);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

/// Update DocAuth
const updateDocAuth=async (req,res) => {
    try {
        const id=req.params.id;
        const updateDoc=await DoctorAuth.findByPk(id);
        updateDoc.update(req.body);
        res.status(200).json({message:'Update successfully',data:updateDoc});
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

module.exports={addDocAuth,getDocAuth,updateDocAuth}