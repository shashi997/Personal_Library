const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    release: {
        type: Number,
        required: true
    },
    image: {
        type:String,
        required: true
    }
}, {
    timestamps: true    // createdAt, UpdatedAt
})

const Movie = mongoose.model('movie', movieSchema)

module.exports = Movie