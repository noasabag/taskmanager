const express = require('express')
const taskroute = require('./routes/task.js')
const User = require('./src/models/user.js')
const Task = require('./src/models/task.js')


const mongoose = require('./src/db/mongoose.js')

app = express()
const userroute = require('./routes/user.js')


//app.use( ((req, res, next);           =>{


//}))



app.use(express.json())
app.use(taskroute)

app.use(userroute)
 

const main =  async ()=>{


 const user = await User.findById('619262773c4008b59af4d38d')
    await user.populate('tasks')
    //console.log(user.tasks)
}
main()


const port = process.env.PORT || 3000
app.listen(port,()=>console.log('Hello YOURE ON PORT' + port))
