const express=require("express");
const router=express.Router();

router.use(express.urlencoded({extended:false}));
router.use(express.json());

const movieModel=require ("../model/movieModel");
const ticketBookingModel=require("../model/ticketBookings");

// Get movies
router.post('/getbookedtkts/:id', async(req,res)=>{
    const userId=req.params.id;
    console.log(userId)
    try {
        let movies= await ticketBookingModel.find({"userId":userId}).exec()
        console.log(movies);
        
        res.json(movies);
        }
        
     catch (error) {
        console.log(error) ;
        res.json("error");
    }
    
})

// booking tikets 
// router.post('/booktickets',async (req,res)=>{
//     const tkts=req.body;
    
//     console.log(tkts)
//     try {
//     const booking= await ticketBookingModel(tkts).save();
//     console.log(booking);
//     res.json(booking);
//     }
//     catch(error){
//         console.log(error) ;
//        res.json("error");
//     }
// })

// booking tikets 
router.post('/booktickets', async (req, res) => {
  const bookingData = req.body;
  const { seat_number, movieId } = bookingData;

  try {
      // Check if the seat is already booked for the selected movie
      const existingBooking = await ticketBookingModel.findOne({ movieId, seat_number });

      if (existingBooking) {
          // Seat is already booked, return an error response
          return res.status(400).json({ error: 'Seat not available. Please choose another seat.' });
      }

      // Seat is available, proceed with booking
      const booking = await ticketBookingModel(bookingData).save();
      console.log(booking);
      res.json(booking);
  } catch (error) {
      console.log(error);
      res.status(500).json("error");
  }
});


router.post('/bookings', async (req, res) => {
    try {
        const { selectedMovie, selectedSeats, name, email } = req.body;
        const newBooking = new TicketBooking(bookingData);
      const savedBooking = await newBooking.save();
      res.json(savedBooking);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//  Booking Update
router.post("/bookingupdate", async(req,res)=>{
    const id= req.body._id;
    var query={_id:id};
    try {
        var post = await movieModel.findOneAndUpdate(query, {$inc:{'NoOfSeats': 1 }}).exec();
        if (!post) {
          res.status(404).json({ message: 'Document not found' });
          return;
        }
        const newseat = post.NoOfSeats;
        var updatedseat = newseat + 1;
        res.json({ message: 'Seats updated', updatedseat });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }

})

// Cancel tickets
router.post('/cancelticket/:id', async(req,res)=>{
    const tktId=req.params.id;
    console.log(tktId)
    try {
        let movies= await ticketBookingModel.findByIdAndDelete({"_id":tktId})
        console.log(movies);
        
        res.json({message:"Ticket Cancelled"});
        }
        
     catch (error) {
        console.log(error) ;
        res.json("error");
    }
    
})

router.post('/available', async (req, res) => {
    try {
      const movies = await Movie.find({ availableSeats: { $gt: 0 } }); // Fetch movies with available seats
      res.json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/availability/:movieId', async (req, res) => {
    try {
      const movieId = req.params.movieId;
  
      // Find the movie's total available seats based on the provided movieId
      const movie = await TicketBooking.findOne({ movieId });
  
      if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
      }
  
      // Fetch existing bookings for the movie
      const bookings = await TicketBooking.find({ movieId });
  
      // Calculate available seats
      const reservedSeatsCount = bookings.reduce(
        (count, booking) => count + booking.seatIds.length,
        0
      );
  
      const availableSeats = movie.totalSeats - reservedSeatsCount;
  
      // Determine availability status
      let availabilityStatus = 'Available';
  
      if (availableSeats <= 10) {
        availabilityStatus = 'Fast Filling';
      } else if (availableSeats === 0) {
        availabilityStatus = 'Housefull';
      }
  
      res.json({ movieName: movie.movieName, availabilityStatus });
    } catch (error) {
      console.error('Error fetching availability status:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
  
  router.post('/api/availableMovies', (req, res) => {
  Movie.find({}, (err, movies) => {
    if (err) {
      return res.status(500).json({ error: 'Could not retrieve movies' });
    }
    return res.status(200).json(movies);
  });
});

router.post('/api/reserve-seat', async (req, res) => {
  const { seat_number, user_id, movie_id } = req.body;

  try {
    // Check if the seat is available
    const existingReservation = await Reservation.findOne({ seat_number, movie_id });

    if (existingReservation) {
      // Seat is already reserved
      return res.status(400).json({ error: 'Seat not available' });
    }

    // Create a new reservation
    const reservation = new Reservation({ seat_number, user_id, movie_id });
    await reservation.save();

    // Seat reserved successfully
    res.json({ message: 'Seat reserved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

  

module.exports=router;