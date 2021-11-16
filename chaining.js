const Task = require('./src/models/task.js')
const mongoose = require('./src/db/mongoose.js')


/*
Task.findByIdAndDelete('615b364c38d12c7e0f26c482').then((f)=>{
    console.log(f)
    return Task.countDocuments({copmpleted : false})
}).then((num)=>{console.log(num)}).catch((e)=>{ console.log(e)})*/

const deletecount = async (id)=>{
await Task.findByIdAndDelete(id)
 const count= await Task.countDocuments({copmpleted : false})
return count
}
deletecount(444).then((c)=>{console.log(c)}).catch((e)=>{ console.log(e)})

