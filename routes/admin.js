const express=require("express");
const router=express.Router();

router.use(express.urlencoded({extended:false}));
router.use(express.json());
const jwt = require("jsonwebtoken"); // Import the jsonwebtoken library


const movieModel=require ("../model/movieModel");
//add movie
router.post("/addMovie", async(req,res)=>{
    const newMovie=req.body;
    console.log(newMovie)
    try {
      console.log("first")
      const addMovie = await movieModel(newMovie).save();
      res.status(200).json({ message: "movie added successfully" });
  } catch (err) {
    console.log(err); // Use 'err' instead of 'error'
    res.json("error");
  }
})

// const verifyToken = (req, res, next) => {
//     const token = req.headers.authorization; // Assuming you send the token in the 'Authorization' header
  
//     if (!token) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
  
//     jwt.verify(token, "Harsha", (err, decoded) => {
//       if (err) {
//         return res.status(401).json({ message: "Token is not valid" });
//       }
//       req.user = decoded;
//       next();
//     });
//   };
  
//   // Protected route with JWT authentication
//   router.post("/addMovie", verifyToken, async (req, res) => {
//     const newMovie = req.body;
//     console.log(newMovie);
  
//     try {
//       console.log("first");
//       const addMovie = await movieModel(newMovie).save();
//       res.status(200).json({ message: "Movie added successfully" });
//     } catch (err) {
//       console.log(err);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   });
  
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


  // Express route to delete a movie by its ID
  router.post("/deleteMovie/:id",async (req,res)=>{
    const movieId=req.params.id;
    console.log(movieId)
    try {
        const movie= await movieModel.findByIdAndDelete({_id:movieId})
        res.status(200).json({message:"movie removed successfully"});
        console.log(movie);
    } 
    catch (error) {
        console.log(error);
        res.json({message:"something went wrong"});
    }  
 }) 


 router.post("/updateMovie/:id",async (req,res)=>{
  const movieId=req.params.id;
  console.log(movieId)
  try {
      const movie= await movieModel.findByIdAndUpdate({_id:movieId})
      res.status(200).json({message:"movie update successfully"});
      console.log(movie);
  } 
  catch (error) {
      console.log(error);
      res.json({message:"something went wrong"});
  }  
}) 

  router.post("/viewMovie/:id", async(req,res)=>{
    const movieId=req.params.id;
    console.log(movieId)
    try {
        const movie =await movieModel.findOne({_id:movieId})
        res.status(200).send(movie);
        
    } catch (err) {
       console.log(err) ;
       res.json("err");
    }
})

module.exports=router;