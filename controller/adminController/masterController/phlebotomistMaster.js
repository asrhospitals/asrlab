const Phlebotomist=require('../../../model/adminModel/masterModel/phlebotomistMaster');

/// Add New Phlebotomist
const addPhlebo=async(req,res)=>{
    try {
        const newPhlebo=req.body;
        const createPhlebo=await Phlebotomist.create(newPhlebo);
        res.status(201).json(createPhlebo);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Get Phlebotomist

const getPhlebo=async(req,res)=>{
    try {
        const getphlebo=await Phlebotomist.findAll();
        res.status(200).json(getphlebo);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Update Phlebo
const updatePhlebo=async(req,res)=>{
    try {
        const id=req.params.id;
        const updatephlebo=await Phlebotomist.findByPk(id);
        updatephlebo.update(req.body);
        res.status(200).json(updatephlebo);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

module.exports={addPhlebo,getPhlebo,updatePhlebo}