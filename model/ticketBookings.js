const mongoose=require("mongoose");
const ticketBookingSchema=mongoose.Schema({
    userId: "String",
    movieId: "String",
    movieName:"String",
    NoOfSeats:"Number",
    timing:"String",
    date:{
        type: Date,
    }  
})
ticketBookingModel=mongoose.model("ticketBooking",ticketBookingSchema);
module.exports=ticketBookingModel;