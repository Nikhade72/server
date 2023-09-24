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
router.post('/booktickets',async (req,res)=>{
    const tkts=req.body;
    
    console.log(tkts)
    try {
    const booking= await ticketBookingModel(tkts).save();
    console.log(booking);
    res.json(booking);
    }
    catch(error){
        console.log(error) ;
       res.json("error");
    }
})

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

module.exports=router;