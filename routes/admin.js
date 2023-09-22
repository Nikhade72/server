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
router.delete("/deleteMovie/:id", async (req, res) => {
    const movieId = req.params.id;
  
    try {
      const movie = await movieModel.findByIdAndDelete(movieId);
  
      if (movie) {
        res.status(200).json({ message: "Movie removed successfully" });
      } else {
        res.status(404).json({ message: "Movie not found" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });
  

router.put("/updateMovie/:id", async (req, res) => {
    const movieId = req.params.id;
    const updatedMovieData = req.body; // This should contain the updated movie data
  
    try {
      // Find the movie by its ID and update it
      const updatedMovie = await movieModel.findByIdAndUpdate(
        movieId,
        updatedMovieData,
        { new: true } // This option returns the updated document
      );
  
      if (!updatedMovie) {
        // If the movie with the given ID is not found, return a 404 response
        return res.status(404).json({ message: "Movie not found" });
      }
  
      // If the movie is successfully updated, return a success response
      res.status(200).json({ message: "Movie updated successfully", movie: updatedMovie });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Something went wrong" });
    }
  });


module.exports=router;