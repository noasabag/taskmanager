const jwt = require('jsonwebtoken');
const User = require('../models/user.js')


const auth =  async(req, res, next)=>{
    try{
        const token = req.header('Authorization')
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
const user = await User.findOne({_id:decoded._id,'tokens.toke':token})


if (!user) {throw new Error()}
req.user =user
req.auth = token
next()
}
    catch(e){
        res.status(400).send('pls auth')
    }
    
}

module.exports = auth
