const mongoose=require("mongoose");
userSchema=mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    password:{
        type:String,
        required:true,
        minLength:6,
    }

})
userModel=mongoose.model("user",userSchema);
module.exports=userModel;