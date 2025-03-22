const RoleType=require('../../../model/adminModel/masterModel/roletypeMaster');

/// Add Role Type
const addRole=async(req,res)=>{
    try {
        const newRole=req.body;
        const createRole=await RoleType.create(newRole);
        res.status(201).json(createRole); 
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};

/// Get Role

const getRole=async(req,res)=>{
    try {
        const getrole=await RoleType.findAll();
        res.status(200).json(getrole);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
};


/// Update Role

const updateRole=async(req,res)=>{
    try {
        const id=req.params.id;
        const updaterole=await RoleType.findByPk(id);
        updaterole.update(req.body);
        res.status(200).json(updaterole);
    } catch (error) {
        res.status(400).send({message:'Something went wrong',error:error.message});
    }
}

module.exports={addRole,getRole,updateRole}