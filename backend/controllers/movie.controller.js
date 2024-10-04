const Movie = require('../models/movie.model.js')
const mongoose = require('mongoose')


const getMovies = async(req, res) => {
    try {
        const movies = await Movie.find({})
        res.status(200).json({ success: true, data: movies})
    } catch (error) {
        console.log("Error in fetching movies", error.message);
        res.status(500).json({ success: false, message: "server Error"})
    }
}

const createMovie = async(req, res) => {
    const movie = req.body  // user/client will send the data

    if(!movie.name || !movie.release || !movie.image){
        return res.status(400).json({ success: false, message: "please provide all fields"})
    }

    const newmovie = new Movie(movie)   // passing the movie we got from user to Movie model and storing in newmovie 

    try {
        await newmovie.save()
        res.status(201).json({ success: true, data: newmovie})
    } catch (error) {
        console.error("Error in creating movie", error.message);
        res.status(500).json({ success: false, message: "server error"})  
    }
}

const updateMovie = async(req, res) => {
    const {id} = req.params

    const movie = req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Movie id"})
    }

    try {
        const updatedmovie = await Movie.findByIdAndUpdate(id, movie, {new: true})
        res.status(200).json({ success: true, data: updatedmovie})
    } catch (error) {
        res.status(500).json({ success: false, message: "server error"})
    }
}

const deleteMovie = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ success: false, message: "Invalid Movie id"})
    }
    
    try {
        await Movie.findByIdAndDelete(id)
        res.status(200).json({success: true, message: "movie deleted"})
    } catch (error) {
        console.log("error in deleting movie", error.message);
        res.status(500).json({ success: false, message: "server error"})
    }
}

module.exports = {
    getMovies,
    createMovie,
    updateMovie,
    deleteMovie
}