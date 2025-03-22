const Profile=require('../../../model/adminModel/masterModel/profile');

/// Add Profile
const createProfile=async (req,res) => {
    try {
        const newProfile=req.body;
        const addProfile=await Profile.create(newProfile);
        res.status(201).json(addProfile);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
        
    }
    
};

/// Get Profile
const fetchProfile=async (req,res) => {
    try {
        const getNewProfile=await Profile.findAll();
        res.status(200).json(getNewProfile);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

/// Update Profile
const updateProfiles=async (req,res) => {
    try {
        const id=req.params.id;
        const updateNewProfile=await Profile.findByPk(id);
        updateNewProfile.update(req.body);
        res.status(200).json({message:'Update Successfully',data:updateNewProfile});
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
    
};

module.exports={createProfile,fetchProfile,updateProfiles}