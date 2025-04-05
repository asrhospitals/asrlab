require('dotenv').config();
const express=require('express');
const app=express();
const cors=require("cors");
const PORT=process.env.PORT || 2000;
const MasterRoutes=require('./routes/adminRoutes/masterRoute');
const RegistrationRoutes=require('./routes/patientRoutes/patientRoutes');
const AuthRoutes=require('./routes/authRoutes/authenticationRoute');
const PatientImageUploader=require('./controller/commonImageUploader/patientImage');
const SignatureImageUploader=require('./controller/commonImageUploader/signatureImage');
const sequelize=require('./db/connectDB');
const verifyToken=require("./middlewares/authMiddileware");
const role=require("./middlewares/roleMiddleware");

app.use(cors());
app.use(express.json());

/// User Authentication Routes
app.use('/lims/authentication',AuthRoutes);

/// All routes
app.use('/lims/master',verifyToken,role("admin"),MasterRoutes);

/// Routes used by Phelbotomist
app.use('/lims/ppp',verifyToken,role('phlebotomist','reception'),RegistrationRoutes);

// Routes to upload images
app.use('/lims/patient',PatientImageUploader);
app.use('/lims/signature',SignatureImageUploader);

// Test Route
app.get('/',async (req,res) => {
    return res.json({message:"Welcome to the AWS Cloud"});
});

const server=async()=>{
    try {
        await sequelize.authenticate().then(()=>{console.log("Database Connected");}).catch(()=>{console.log("Database Connection Fail");});
        // await sequelize.sync();
        app.listen(PORT,()=>{ console.log(`${PORT} port is Connected`);});
    } catch (error) {
        console.log(error)
    }
}

server();
