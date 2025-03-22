const Instrument=require('../../../model/adminModel/masterModel/instrumentMaster');

/// Add Instrument
const addInstrument=async(req,res)=>{
    try {
        const newInstrument=req.body;
        const createIntrument=await Instrument.create(newInstrument);
        res.status(201).json(createIntrument);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Get Instrument
const getIntrument=async(req,res)=>{
    try {
        const getinstrument=await Instrument.findAll();
        res.status(200).json(getinstrument);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Update Intrument
const updateIntrument=async(req,res)=>{
    try {
        const id=req.params.id;
        const updateinstrument=await Instrument.findByPk(id);
        updateinstrument.update(req.body);
        res.status(200).json(updateinstrument);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

module.exports={addInstrument,getIntrument,updateIntrument}