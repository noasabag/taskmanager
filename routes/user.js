const User = require('../src/models/user.js')
const express = require('express')
const Task = require('../src/models/task.js')
userrouter = new express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../src/middleware/Authorization.js');
const multer = require('multer')
userrouter.delete('/user/me',auth ,async(req,res)=>{

    try{
        //await req.user.deleteOne({ _id: req.user._id });
        req.user.remove()
            res.status(200).send('deleted'+req.user)
    }
    catch(e){
        return  res.status(500).send('e'+e)
    }
    
    
    })
userrouter.post('/user/logoutall',auth, async (req,res)=>{
    try{
        const user = await User.findOne({email:req.body.email })

        user.tokens = []
user.save();
        return res.send(user)
    }
    catch(e){
        res.status(400).send('Error!' + e)
    
    }
    })
userrouter.post('/user/logout',auth, async (req,res)=>{
    try{
        req.user.tokens= req.user.tokens.filter((toke)=>{
            
            if (toke.toke===req.auth){
            return false}
           else {return true}

        }
        ) 
        req.user.save();

        return res.send(req.user)
    }
    catch(e){
        res.status(400).send('Error!' + e)
    
    }
    })



userrouter.post('/user', async (req,res)=>{
    const user=  new User(req.body)
       
    try{
        await user.save()
        const jwsent = user.jwtparser()
        res.status(200).send('Success!'+ user+ '' + jwsent)
    }
    catch(e){
        res.status(400).send('Error!' + e)
    }
})
userrouter.post('/user/:login', async (req,res)=>{

   
    try{
        const user = await User.findOne({email:req.body.email })
        if(!user) 
        return res.send('cant find this user')
            const jwsent =await user.jwtparser()
           return res.send({user , 'token': jwsent})

        
    }
        
    catch(e){
        res.status(400).send('Error!' + e)

    }

})

 
userrouter.get('/user/:me' ,auth,async (req,res)=>{
    res.send(req.user)
})




userrouter.patch('/user/me', auth , async (req,res)=>{
   

 const arr1 = Object.keys(req.body)
 const arr2= ['name', 'email','password']
 const valid = arr1.every((arr1params)=> arr2.includes(arr1params))
if(!valid) {
return res.status(400).send( 'Invalid updates!')

}

try{
arr1.forEach((arr1params)=>{req.user[arr1params]=req.body[arr1params]})

req.user.save()

res.send(req.user)

}
catch(e){
    res.status(400).send('Error!' +e )
}
})



const upload = multer({
     dest: 'avatar',
    limits:{
        fileSize:1000000	
    },
    fileFilter(req, file, cb){
        file.originalname.match()

    }
    })

userrouter.post('/user/me/avatar',upload.single('avatar'), async (req,res)=>{
    res.send()
})


module.exports= userrouter;