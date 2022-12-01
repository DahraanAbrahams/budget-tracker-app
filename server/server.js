const path = require('path')
const express = require('express')
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')

// access .env (environment variables)
const dotenv = require('dotenv').config()
const port = process.env.PORT||5001
const app = express()

// middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler) //overwrites default express error handler

const dbConnect = require('./db/connection')

//using routes
app.use('/api/transactions', require('./routes/transactionRoutes'))
app.use('/api/budget', require('./routes/budgetRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(proxy(['/api' ], { target: 'http://localhost:5001' }));
} 

//server frontend
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'client', 'build', 'index.html')
      )
    )
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
}
  
dbConnect.then(db => { 
    if (!db) return process.exit(1)
    
    app.listen(port, () => { 
        console.log(`Server is running on port: http://localhost:${port}`)
    })

    app.on('error', err => console.log(`Failed to connect with HTTP Server: ${err}`))
}).catch(error => { 
    console.log(`Connection Failed: ${error}`) 
})
