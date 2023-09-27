const mongoose=require("mongoose");
const ticketBookingSchema=mongoose.Schema({
    userId: "String",
    movieId: "String",
    movieName:"String",
    NoOfSeats:"Number",
    name: String,
    email: String,
    title: String,
    seatIds: [String],
    seat_number: String,
    date:{
        type: Date,
    }  
})
ticketBookingModel=mongoose.model("ticketBooking",ticketBookingSchema);
module.exports=ticketBookingModel;