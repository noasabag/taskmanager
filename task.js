const mongodb = require('mongodb');
const url = 'mongodb://127.0.0.1:27017';
const MongoClient = mongodb.MongoClient
const ObjectId= mongodb.ObjectId
MongoClient.connect(url, {UseNewUrlParser: true, }, ((error, client)=> {if(error) return console.log('cant connect')

const db=client.db('task-manager')  
/*         
db.collection('tasks').insertMany([{description:'clean the bath' , completed: true},
                                {description:'back yard' , completed: true},
                                {description:'kitchen' , completed: false}],
                                 ((error,result)=>{
                                                 if(error) return console.log('cant add documents')
                                console.log(result)
}))

*/
//db.collection('tasks').findOne({_id: new ObjectId("6159863d1a0073ed6efc14ae") },(error,result)=>{
  //  if(error) return console.log('error')
//console.log(result)

//})
//db.collection('tasks').find({completed: false}).toArray((error,task)=>{console.log(task)})


//db.collection('tasks').updateMany({completed: false},
  //  {$set: { completed: true} } ).then((result)=>{console.log(result)}).catch((error)=>{console.log(error)})

db.collection('tasks').deleteOne({description: "back yard"})
.then((result)=>{console.log( result)})
.catch((error)=>{console.log('error'+ error)})


}   )
                    )
