const mongoose = require('mongoose') 
mongoose.connect( process.env.MONGODB /*{UseNewUrlParser: true, useCreateIndex: true } */)
console.log("success conect to mongodb "+ process.env.MONGODB);