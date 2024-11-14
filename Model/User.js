const mongoose=require("mongoose");
const attendanceSchema=new mongoose.Schema({
    attend:{
        type:Boolean,
        default:false
    },
    startTime:{
        type:String
    },
    endTime:{
        type:String
    }
})
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        
    },
    lastName:{
        type:String,
       
    },
    age:{
        type:Number
    },
    sex:{
        type:String
    },
    phone:{
        type:String
    },
    imagePath:{
        type:String
    },
    attendance:{
        type:[attendanceSchema],
        default:[]
    }
});
const User=mongoose.model("user",userSchema);
module.exports={User}