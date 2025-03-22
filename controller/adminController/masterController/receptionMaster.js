const Reception=require('../../../model/adminModel/masterModel/receptionMaster');

/// Add Receptionist
const addReception=async(req,res)=>{
    try {
        const newRecep=req.body;
        const createRecep=await Reception.create(newRecep);
        res.status(201).json(createRecep);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Get Reception

const getReception=async(req,res)=>{
    try {
        const getrecep=await Reception.findAll();
        res.status(200).json(getrecep);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
}

/// Update Reception
 const updateReception=async(req,res)=>{
    try {
        const id=req.params.id;
        const updaterecep=await Reception.findByPk(id);
        updaterecep.update(req.body);
        res.status(200).json(updaterecep)
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
 }

 module.exports={addReception,getReception,updateReception}