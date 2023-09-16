const mongoose=require("mongoose");
adminSchema=mongoose.Schema({
    userName:"String",
    password:"String"

})
adminModel=mongoose.model("admin",adminSchema);
module.exports=adminModel;