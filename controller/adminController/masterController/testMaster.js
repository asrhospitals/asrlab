const PatientTest=require('../../../model/adminModel/masterModel/test');

/// Add Test
const addTest= async(req,res)=>{
    try {
        const newTest=req.body;
        const createTest=await PatientTest.create(newTest);
        res.status(201).json({message:'Test created succesfully',data:createTest});
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
}

//Get Test

const getTest=async (req,res) => {
    try {
        const newTest=await PatientTest.findAll();
        res.status(200).json(newTest);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
}

/// Update Test

const updateTest=async (req,res) => {
    try {
        const id=req.params.id;
        const newTest = await PatientTest.findByPk(id); 
        newTest.update(req.body); 
        res.json(newTest);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
}


module.exports={addTest,getTest,updateTest}