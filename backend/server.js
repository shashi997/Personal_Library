const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db.js')
const movieRoutes = require('./routes/movie.route.js')

dotenv.config()
const port = process.env.port || 5000

const app = express()

app.use(express.json()) // allows us to accept json data from the req body

app.get('/', (req, res) => {
    res.send("<h1>Movies, Youtube videos</h1>")
})


app.use('/api/movies', movieRoutes)


connectDB()
.then( () => {
    app.listen(port , () => {
        console.log(`server is running on port : ${port}`);
    })
})
.catch((error) => {
    console.log(error.message);
})


//