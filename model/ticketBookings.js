const mongoose = require("mongoose");

const ticketBookingSchema = mongoose.Schema({
    userId: String,
    movieId: String,
    movieName: String,
    NoOfSeats: Number,
    name: String,
    email: String,
    seat_number: String,
    // date:{
    //     type:Date,
    //     default: new Date(),
    // },
     
    
});

const ticketBookingModel = mongoose.model("ticketBooking", ticketBookingSchema);

module.exports = ticketBookingModel;
