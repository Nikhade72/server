const mongoose=require("mongoose");
const ticketBookingSchema=mongoose.Schema({
    userId: String,       // Corrected data type from "String" to String
    movieId: String,     // Corrected data type from "String" to String
    movieName: String,
    NoOfSeats: Number,   // Corrected data type from "Number" to Number
    name: String,
    email: String,
    title: String,
    seatIds: [String],
    seat_number: String,
    date: {
        type: Date,
        default: Date.now  // You can set a default value if needed
    }
})
ticketBookingModel=mongoose.model("ticketBooking",ticketBookingSchema);
module.exports=ticketBookingModel;