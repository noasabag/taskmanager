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


// const user = await User.findById('619262773c4008b59af4d38d')
  //  await user.populate('tasks')
    //console.log(user.tasks)
}
main()


const port = process.env.PORT
app.listen(port,()=>console.log('Hello YOURE ON PORT' + port))


const person = {
    name: "Anna",
    yearBorn: 1992,
    likeSports: false,
    pets:['dog', 'cat', 'elephant'] 
  }
  
  function readPersonMind(person){
    if (person.likeSports){
      const like= ' like sports'
    }
    else
     like ='dont like sports'
  return (`hi ${person.name}!
  I can tell by my mysterious powers that your name is spelt with ${person.name.length} letters,
  you are ${(2021-person.yearBorn)} years old,
  you ${like} and you have ${person.pets.length} pets.
  `)
  }
  const dailyManufacture = [
    {name: "pesek zman", type: "chocolate", value: 5000},
    {name: "mekupelet", type: "chocolate", value: 650},
    {name: "tofee", type: "candy", value: 10},
    {name: "cookie", type: "choolate chip", value: 1200},
    {name: "taami", type: "chocolate", value: 77}
  ]
  const dailyTotal = dailyManufacture.filter((object)=>{
    if (object.type ==="chocolate") 
      return true
    else
        return false
  }).map((object)=>{return object = object.value}).reduce((acc,cur)=> acc+cur)
  
 //console.log(dailyTotal);
 //const dateObject = new Date(); let epochElapsedTime = dateObject.getTime(); console.log(epochElapsedTime);
 //const regularExpression = /^abc$/; const textString = 'abcabc'; const result = regularExpression.test(textString); console.log(result); // true
 