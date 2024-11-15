const express = require("express");
const app = express();
const cors = require("cors");
const {upload} =require("./Multer/multer");
const {User} =require("./Model/User");
const mongoose=require("mongoose")
require('dotenv').config();



const corsOptions = {
    origin: "https://attendance-front-end-nine.vercel.app", 
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true, 
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images",express.static("./uploads"))



mongoose.connect(process.env.DATABASE_URL).then(()=>{
    console.log("DB connected")})



    app.get('/users', async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
    

app.post("/register", upload.single("image"), async (req, res) => {
    console.log(req.body); 
    console.log(req.file);
  

   const user= await User.create({
       ...req.body,imagePath:`${req.file.filename}`
    });
    console.log(user);
    if(!user){console.log("fail to create user");return;}
    res.status(200).json(user)
   
});
app.get("/attendance",async (req,res)=>{
    try{
        const user=await User.find({},{
            firstName:1,lastName:1,_id:1
         })
         console.log(user)
         if(!user){
            console.log("no registered user");
            return;
         }
       
        res.status(200).json(user)
        
    }
    catch(err){
          console.log("faid to fetch attendance");
    }
     
})
app.post("/attendance",(req,res)=>{
       const data=req.body;
       console.log(data)
       data.forEach(async (element) => {
        await User.findByIdAndUpdate({_id:element._id},{
            $push:{
                attendance:{attend:element.attend,startTime:element.startTime,endTime:element.endTime}
            }
        })
       });
       res.status(200).json({message:"successfully post attendance"})
      
    }) 
    app.delete("/delete/:id", async (req, res) => {
        const { id } = req.params;
        try {
            const deletedUser = await User.findByIdAndDelete({_id:id});
            if (!deletedUser) {
                return res.status(404).send({ message: "User not found" });
            }
            res.status(200).send({ message: "User deleted successfully" });
        } catch (error) {
            res.status(500).send({ message: "Error deleting user", error });
        }
    });







const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});