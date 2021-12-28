const mongoose = require('mongoose') 

const validator = require('validator') 

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Task = require('./task');



const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true
},
age:{
    type:Number
},
email:{
    type:String,
    required:true,
    trim: true,
    unique: true, 
    validate(value){
       if(!validator.isEmail(value)) throw new Error('invalid email')
    }
},
password:{
    type:String,
    required: true,
    trim:true,
    validate(value){
        if(value.lenght<7|| value.includes('password'))
        throw new Error('invalid password')
    
    },
},
profile:{
    type:Buffer
} ,

tokens:[{
  toke:  
        {
            type:String,
            required: true
        }
    
}] 
}, {timestamps: true})
 userschema.methods.jwtparser = function jwtparser () {
      const jstt=  jwt.sign({_id:this._id.toString()},process.env.JWT_SECRET)
 this.tokens.push({toke:jstt})
 //this.tokens =this.tokens.concat({toke:jstt})
 this.save()
return jstt }

userschema.methods.toJSON = function (){
user = this.toObject()
delete user.password
return user

}


userschema.virtual('tasks',{
    ref: 'Task' ,
    localField: '_id',
    foreignField: 'owner'
})
userschema.pre('save', async function(next){

    this.password = await bcrypt.hash(this.password, 8)
   next();

})
userschema.pre('remove', async function (next){

await Task.deleteMany({owner:this.id})

next();
})


/*
userschema.pre('save', async function(next){

const hashpassworsd = await bcrypt.hash(this.password, 8, function(err, result) {
   if(result){  this.password = hashpassworsd;
}
   next();
})
})
*/

const User= mongoose.model('User',userschema)

module.exports = User
