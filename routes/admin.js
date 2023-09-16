const express=require("express");
const router=express.Router();

router.use(express.urlencoded({extended:false}));
router.use(express.json());

const movieModel=require ("../model/movieModel");
// add movie
router.post("/addMovie", async(req,res)=>{
    const newMovie=req.body;
    console.log(newMovie)
    try {
        console.log("first")
        const addMovie=await movieModel(newMovie).save();
        res.status(200).json({message:"movie added succesfully"})
        
    } catch (err) {
       console.log(error) ;
       res.json("error");
    }
})
//view all movies
 router.post("/viewMovies",async (req,res)=>{
    const input=req.body;
    try {
        const movies= await movieModel.find()
        res.status(200).send(movies);
    } catch (error) {
        console.log(error);
        res.json(error);

    }
   
 })

// delete a movie
router.post("/deleteMovie/:id",async (req,res)=>{
    const movieId=req.params.id;
    console.log(movieId)
    try {
        const movie= await movieModel.findByIdAndDelete({_id:movieId})
        res.status(200).json({message:"movie remoived successfully"});
        console.log(movie);
    } 
    catch (error) {
        console.log(error);
        res.json({message:"something went wrong"});

    }
   
 })
//  update ticket rate and timing
// router.post("/updateticket/:id",async (req,res)=>{
//     const movieId=req.params.id;
//     const newRate=req.body;
//     console.log(newRate)
    
//     try {
//         const movie= await movieModel.findOneAndUpdate(  { "_id" : "6503379c86d081bdb258638" },
//    { $set: { "TicketRates" : "567" } }).exec()
//    console.log("first")
//         // movie.save();
//         res.status(200).json({message:"rate updated"});
        
//     } 
//     catch (error) {
//         console.log(error);
//         res.json({message:"something went wrong"});

//     }
   
//  })


module.exports=router;