const ColorMaster=require('../../../model/adminModel/masterModel/colormaster');

// Add Color 

const addColor=async (req,res) => {
    try {
        const add_color=req.body;
        const create_color=await ColorMaster.create(add_color);
        res.status(201).json(create_color);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};


/// Get Color

const getColor=async (req,res) => {
    try {
        const getColors=await ColorMaster.findAll();
        res.status(200).json(getColors);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});

    }
    
};


/// Update Colors

const updateColors=async (req,res) => {

    try {
        const id=req.params.id;
        const updateColor=await ColorMaster.findByPk(id);
        updateColor.update(req.body);
        res.status(200).json(updateColor);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});

    }
    
};


module.exports={addColor,getColor,updateColors}