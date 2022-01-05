const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Task = require('./task');

const userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)){
             throw new Error('invalid email')
          }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (value.lenght < 7 || value.includes('password'))
                throw new Error('invalid password')

        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    
    profile: {
        type: Buffer
    },

    tokens: [{
        toke:
        {
            type: String,
            required: true
        }

    }]
}, { timestamps: true })

userschema.virtual('tasks', {
    ref: 'Task',
    localField: '_id',
    foreignField: 'owner'
})

userschema.methods.toJSON = function () {
    user = this.toObject()
    delete user.password
    return user

}

userschema.methods.jwtparser = async function () {
    const jstt = jwt.sign({ _id: this._id.toString() }, process.env.JWT_SECRET)
    this.tokens.push({ toke: jstt })
    await this.save()
    return jstt
}


// userschema.statics.findByCredentials = async (email, password) => {
//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new Error('Unable to login')
//     }

//     const isMatch = await bcrypt.compare(password, user.password)

//     if (!isMatch) {
//         throw new Error('Unable to login')
//     }

//     return user
// }


userschema.pre('save', async function (next) {

    this.password = await bcrypt.hash(this.password, 8)
    next();

})
userschema.pre('remove', async function (next) {

    await Task.deleteMany({ owner: this.id })

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

const User = mongoose.model('User', userschema)

module.exports = User
