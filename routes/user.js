const User = require('../src/models/user.js')
const express = require('express')
const Task = require('../src/models/task.js')
userrouter = new express.Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../src/middleware/Authorization.js');
const multer = require('multer')
const sharp = require('sharp')
const email = require('../src/emails/send.js')








userrouter.post('/user', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const jwsent = await user.jwtparser()
        //   email.welcome(user.name, user.email)
        res.status(201).send('Success!' + user + '' + jwsent)
    }
    catch (e) {
        res.status(400).send('Error!' + e)
    }
})

userrouter.post('/user/login', async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            throw new Error('Unable to login')
        }
        
         const isMatch = await bcrypt.compare( req.body.password ,await bcrypt.hash(req.body.password, 8))
        if (!isMatch) {
            console.log(await bcrypt.hash(req.body.password, 8))
            throw new Error('Unable to login')
        }
        console.log(await bcrypt.hash(req.body.password, 8))

        const token = await user.jwtparser()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send('err')
    }
})

userrouter.post('/user/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((toke) => {

            if (toke.toke === req.auth) {
                return false
            }
            else { return true }

        }
        )
        req.user.save();

        return res.send(req.user)
    }
    catch (e) {
        res.status(400).send('Error!' + e)

    }
})

userrouter.delete('/user/me', auth, async (req, res) => {

    try {
        //await req.user.deleteOne({ _id: req.user._id });
        req.user.remove()
        email.goodbye(req.user.name, req.user.email)
        res.status(200).send('deleted' + req.user)
    }
    catch (e) {
        return res.status(500).send('e' + e)
    }


})
userrouter.post('/user/logoutall', auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email })

        user.tokens = []
        user.save();
        return res.send(user)
    }
    catch (e) {
        res.status(400).send('Error!' + e)

    }
})



// userrouter.post('/user/login', async (req,res)=>{


//     try{
//         const user = await User.findOne({email:req.body.email })
//         if(!user) 
//         return res.status(400).send('cant find this user')
//             const jwsent =await user.jwtparser()
//            return res.status(201).send({user , 'token': jwsent})


//     }

//     catch(e){
//         res.status(400).send('Error!' + e)

//     }

// })


userrouter.get('/user/:me', auth, async (req, res) => {
    res.send(req.user)
})

userrouter.patch('/user/me', auth, async (req, res) => {


    const arr1 = Object.keys(req.body)
    const arr2 = ['name', 'email', 'password']
    const valid = arr1.every((arr1params) => arr2.includes(arr1params))
    if (!valid) {
        return res.status(400).send('Invalid updates!')

    }

    try {
        arr1.forEach((arr1params) => { req.user[arr1params] = req.body[arr1params] })

        req.user.save()

        res.send(req.user)

    }
    catch (e) {
        res.status(400).send('Error!' + e)
    }
})

const upload = multer({
    limits: {
        fileSize: 5000000
    },
    fileFilter(req, file, cb) {
        if (file.originalname.match(/\.(JPG|JPEG|PNG)$/)) {
            return cb(undefined, true)
        }
        cb(new Error('upload only img'))
    }
})

userrouter.post('/user/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    const buffer = req.file.buffer.sharp().resize({ width: 250, height: 250 }).toFile('png').toBuffer()
    req.user.profile = buffer
    await req.user.save()
    res.send()
}, (error, req, res, next) => {

    res.status(500).send({ error: error.message })
})


userrouter.delete('/user/me/delete/avatar', auth, async (req, res) => {
    req.user.profile = undefined
    await req.user.save()
    res.send('deleted')
})

userrouter.get('/user/me/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user || !user.profile) {
            throw new Error('cant find user e this id')
        }
        res.set('Content-Type', 'image/png')

        return res.send(user.profile)
    }
    catch (e) {
        res.status(500).send(e)
    }


})


module.exports = userrouter;