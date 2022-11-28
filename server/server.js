const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')

// access .env (environment variables)
const dotenv = require('dotenv').config()
const port = process.env.PORT||3001
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler) //overwrites default express error handler

// mongodb connection
const dbConnect = require('./db/connection')

//using routes
app.use('/api/transactions', require('./routes/transactionRoutes'))
app.use('/api/budget', require('./routes/budgetRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

dbConnect.then(db => { 
    if (!db) return process.exit(1)
    
    //listen to the HTTP Server
    app.listen(port, () => { 
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    //if there's an error within the app, we can catch the error from the HTTP server
    app.on('error', err => console.log(`Failed to connect with HTTP Server: ${err}`))
}).catch(error => { 
    console.log(`Connection Failed: ${error}`) // catch error with mongodb connection
})
