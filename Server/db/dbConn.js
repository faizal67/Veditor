const mongoose = require('mongoose')
const config = require('../config')


mongoose.set('strictQuery', false)
mongoose.connect(config.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.error('error connecting to MongoDB:', error.message)
  })

module.exports = mongoose