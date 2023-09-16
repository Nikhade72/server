const mongoose=require("mongoose");
movieSchema=mongoose.Schema({
    MovieName : "String", 
    Image :"String",
    Category:"String",
    Languages:"String",
    Cast:"String",
    Description:"String",
    TicketRates:"Number",
    NoOfSeats:"Number",
    timing:"String"

})
movieModel=mongoose.model("movie",movieSchema);
module.exports=movieModel;