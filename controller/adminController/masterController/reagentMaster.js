const Reagent=require('../../../model/adminModel/masterModel/reagentMaster');

/// Add Reagent
const addReagent=async (req,res) => {
    try {
        const newReagent=req.body;
        const createReagent=await Reagent.create(newReagent);
        res.status(201).json({message:"Created successfully",data:createReagent});
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

/// Get Reagent

const getReagent=async (req,res) => {
    try {
        const newReagent=await Reagent.findAll();
        res.status(200).json(newReagent);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};


/// Update Reagent
const updateReagent=async (req,res) => {
    try {
        const id=req.params.id;
        const updateReg= await Reagent.findByPk(id);
        updateReg.update(req.body);
        res.status(200).json(updateReg);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

module.exports={addReagent,getReagent,updateReagent}