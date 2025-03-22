const Technician=require('../../../model/adminModel/masterModel/technicianMaster');

/// Add Technician
const addTechnician=async(req,res)=>{
    try {
        const newTechnician=req.body;
        const createTechnician=await Technician.create(newTechnician);
        res.status(201).json(createTechnician);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Get Technician

const getTechnician=async(req,res)=>{
    try {
        const gettechnician=await Technician.findAll();
        res.status(200).json(gettechnician);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }

};

/// Update Technician

const updateTechnician=async(req,res)=>{
    try {
        const id=req.params.id;
        const updateTech=await Technician.findByPk(id);
        updateTech.update(req.body);
        res.status(200).json(updateTech);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

module.exports={addTechnician,getTechnician,updateTechnician}