const express = require('express')
const Task = require('../src/models/task.js')
const taskroute = new express.Router()
const auth = require('../src/middleware/Authorization.js');
const User = require('../src/models/user.js')

taskroute.post('/task', auth ,async (req,res)=>{
    const task=  new Task({
        ...req.body,
        owner: req.user._id
      

    })
       
    try{
        await task.save()
        console.log(req.user)
        res.status(200).send('Success!'+ task)
    }
    catch(e){
        res.status(400).send('Error!' + e)
    }
})

taskroute.get('/tasks',auth, async (req,res)=>{
    
         try{ 
             //const tasks= await Task.find({owner : req.user._id}) 
       const match={}
       const sort ={}
        if (req.query.completed)
        match.completed = req.query.completed==='true'
        
        if (req.query.sort){
        const partss= req.query.sort.split(':')

        sort[partss[0]]= sort[partss[1]]==='desc' ? 1: -1
        }
       await req.user.populate({
            
            path: 'tasks', 
            match: match , 
            options:{
                limit: parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        
        
        })
        console.log(sort)
       return res.send(req.user.tasks)
    }
    catch(e){
        res.status(400).send('Error!' +e )
    }
    })




    
taskroute.get('/task/:id', auth ,  (async(req,res)=>{
    const id = req.params.id
    try{
        const tasks= await Task.findOne({_id:id , owner : req.user._id })
        if(tasks)
        return res.send(tasks)
        res.send('couldnt find tasks that have created by you')
    }
    catch(e){
        res.status(400).send('Error!' +e )
    }
}))

taskroute.patch('/task/:id', auth, async (req,res)=>{

    const arr1 = Object.keys(req.body)
    const arr2= ['description', 'completed']




    const valid = arr1.every((arr1params)=> arr2.includes(arr1params))

    //check if all params in arr 1 be in arr 2
    if(!valid) {
        return res.status(400).send( 'Invalid updates!')
    }

    try{
        const task = await Task.findOne({_id: req.params.id ,owner : req.user._id })
        
        if (!task) {
            return res.status(404).send('cant find a task to change')
        }
        arr1.forEach((arr1params)=>{task[arr1params]=req.body[arr1params]})
        
        task.save()
      

        res.send(task)
    }
    catch(e){
        res.status(400).send('Error!' +e )
    }
})

taskroute.delete('/task/:id',auth ,async(req,res)=>{

try{
 const task= await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id})
 if (!task) {
    return res.status(404).send('cant find and delete task by this id')
}

res.status(200).send('deleted'+task)
}
catch(e){
    return  res.status(500).send('e'+e)
}


})
module.exports= taskroute;
