const KitMaster=require('../../../model/adminModel/masterModel/kitmaster');

/// Add Kit
const addKit=async (req,res) => {
    try {
        const addKits=req.body;
        const createKits=await KitMaster.create(addKits);
        res.status(201).json(createKits);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
}

/// Get Kit

const getKit=async (req,res) => {
    try {
        const getKits=await KitMaster.findAll();
        res.status(200).json(getKits);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

/// Update Kits
 const updateKit=async (req,res) => {
    try {
        const id=req.params.id;
        const updateKit=await KitMaster.findByPk(id);
        updateKit.update(req.body);
        res.status(200).json(updateKit);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
 }

 module.exports={addKit,getKit,updateKit}