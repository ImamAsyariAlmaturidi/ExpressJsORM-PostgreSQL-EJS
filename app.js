// Happy coding guys
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/route')

//set up ejs engine view
app.set('view engine', 'ejs')

//middleware for parse data from client side
app.use(express.urlencoded({extended : true}))

//middleware all router
app.use(router)

//running server with localhost:3000
app.listen(port, () => {
    console.log(`Server Running in port ${port}`)
})