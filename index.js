const app = require('./src/app.js')
const port =process.env.PORT
app.listen(port,()=>console.log('Hello YOURE ON PORT' + port))

