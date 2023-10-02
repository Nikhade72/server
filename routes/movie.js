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

router.post("/bookingupdate", async(req,res)=>{
  const id= req.body._id;
  var query={_id:id};
  try {
  var post= await movieModel.updateOne({_id:id},{ $inc: {'SeatAvailable': 1 }}).exec();
  const newseat=post.SeatAvailable;
  var updatedseat=newseat-1;
  res.json({message:"seats updated",post});
  console.log(updatedseat)
  }
  catch (error) {
      console.log(error);
      res.json({message:"seats couldnt update"});

  }

})


//booking tikets 
router.post('/booktickets', async (req, res) => {
  const bookingData = req.body;
  const { seat_number, movieId, UserId} = bookingData;

  try {
      // Check if the seat is already booked for the selected movie
      const existingBooking = await ticketBookingModel.findOne({ movieId, seat_number, UserId });

      if (existingBooking) {
          // Seat is already booked, return an error response
          return res.status(500).json({ error: 'Seat not available. Please choose another seat.' });
      }

      // Seat is available, proceed with booking
      const booking = await ticketBookingModel(bookingData).save();
      console.log(booking);
      res.json(booking);
  } catch (error) {
      console.log(error);
      res.status(700).json("error");
  }
});




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
      const movies = await ticketBookingModel.find({ availableSeats: { $gt: 0 } }); // Fetch movies with available seats
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
    const reservation = new reservation({ seat_number, user_id, movie_id });
    await reservation.save();

    // Seat reserved successfully
    res.json({ message: 'Seat reserved successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('//getbookedtkts/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Use the model to find ticket bookings for the given userId
    const bookings = await ticketBookingModel.find({ userId });

    // Send the bookings as a response
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'An error occurred while fetching bookings' });
  }
});


router.post("/seatupdate/:id", async(req,res)=>{
  const id=req.params.id;
  console.log(id)
  const data=req.body.name;
  console.log(data);
  const datas={ "seats.seatnumber":"1","seats.disabledd":true}
 
  var query={_id:id};
  try {

       const pot=await ticketBookingModel.updateOne(
      {_id:id,"seats.seatnumber": data },
      { $set: {'seats.$.disStatus': true },
        $dec:{'SeatAvailable':1}    },{updeart:true}
      )
      
      var post= await movieModel.updateOne({_id:id},{ $inc: {'SeatAvailable': -1 }}).exec();
      const newseat=post.SeatAvailable;
      var updatedseat=newseat-1;
     res.json({message:"seats updated",updatedseat});
      console.log(post)
  }
  catch (error) {
      console.log(error);
      res.json({message:"seats couldnt update"});

  }

})

// get all movies booked by a perticular user
router.post('/getbookedtkts/:id', async(req,res)=>{
  const userId=req.params.id;
  console.log(userId)
  try {
      let movies= await ticketBookingModel.find({"userId":userId}).sort({date:-1}).exec()
      console.log(movies);
      
      res.json(movies);
      }
      
   catch (error) {
      console.log(error) ;
      res.json("error");
  }
  
})
// router.get('/bookingdetails/:bookingId',async(req,res)=>{
//   try {
//     const { bookingId } = req.params; // Correctly destructure 'bookingId'
//     console.log(bookingId);
//     const bookingDetails = await ticketBookingModel.findById(bookingId);
//     if (!bookingDetails) {
//       return res.status(404).json({ message: 'No Booking Details' });
//     }
//     res.json({ bookingDetails });
//   } catch (error) {
//     console.error('Error fetching booking details:', error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// })

router.get('/bookingdetails/:bookingId', async (req, res) => {
  try {
    const bookingId = req.params.bookingId;
    const bookingDetails = await ticketBookingModel.findById(bookingId);

    if (!bookingDetails) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    res.json({ bookingDetails });
  } catch (error) {
    console.error('Error fetching booking details:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});





module.exports=router;