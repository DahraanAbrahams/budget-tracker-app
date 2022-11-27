const mongoose = require('mongoose')

const connection = mongoose.connect(process.env.ATLAS_URI)
    .then(db => { 
        console.log('Connected to MongoDB ATLAS')
        return db
    }).catch(err => { 
        console.log('MongoDB Connection Error')
        console.error(err)
    })

module.exports = connection
