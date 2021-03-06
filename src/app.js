const express = require('express')
const taskroute = require('../src/routes/task.js')
const User = require('./models/user.js')
const Task = require('./models/task.js')
const mongoose = require('./db/mongoose.js')
const app = express()
const userroute = require('../src/routes/user.js')
app.use(express.json())
app.use(taskroute)

app.use(userroute)

module.exports = app