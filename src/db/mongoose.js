const mongoose = require('mongoose') 


mongoose.connect('mongodb://127.0.0.1:27017/mongoose-api' /*{UseNewUrlParser: true, useCreateIndex: true } */)
console.log("success conect tomongodb");

/*
const me = new User({
    name:'noa' ,
    age: 55,
    email: 'noa1605@gmail.com',
    password:'3654654654'
}
)

me.save().then((value)=>{console.log('v' + value)}).catch((error)=>{console.log('e' + error)})



*/



//const kitchen = new Task({}) 
//kitchen.save().then((task)=>console.log('v' + task)).catch((error)=>console.log(error))

