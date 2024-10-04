const express = require('express')
const {getMovies, createMovie, updateMovie, deleteMovie} = require('../controllers/movie.controller.js')
const router = express.Router()

router.get('/', getMovies)

router.post('/', createMovie)

router.put('/:id', updateMovie)

router.delete('/:id', deleteMovie)


module.exports = router