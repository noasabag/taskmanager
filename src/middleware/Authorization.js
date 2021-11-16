const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');
const User = require('../models/user.js')


const auth =  (async(req, res, next)=>{
    try{
    const token = req.header('Authorization')
    const decoded = jwt.verify(token, ('noasa'))

    const user = await User.findOne({_id:decoded._id,'tokens.toke':token})

if (!user) throw new Error
req.user =user
req.auth = token
    }
    catch(e){
        res.send('pls auth')
    }
    next()
})

module.exports = auth
