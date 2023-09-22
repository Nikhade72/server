const express = require('express');
const app = express();
app.use(express.json());
const movieModel=require ("../model/movieModel");

app.get('/api/viewMovies/:id', (req, res) => {
    const movieId = parseInt(req.params.id);
    const movie = movies.find((m) => m.id === movieId);
  
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
  
    res.json(movie);
  });
  
  // Route to get a list of all movies
  app.get('/api/viewMovies', (req, res) => {
    res.json(movies);
  });

  module.exports = router
