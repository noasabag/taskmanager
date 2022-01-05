const request = require('supertest')
const app = require('../src/app.js')
const User = require('../src/models/user.js')

const userOne = { name: 'noa',
email: 'noa1605@example.com',
password: '16051605!'}


beforeEach(async()=>{
await User.deleteMany({})

 const user=  new User(userOne)
await user.update()
const jwsent = user.jwtparser()
})

test('login a user',async()=>{
    await request(app).post('/user/login').send({
     email: userOne.email,
     password: userOne.password
     }).expect(200)
 }) 


test('Should signup a new user', async () => {
    await request(app).post('/user').send({
        name: 'Andrew',
        email: 'andgghgkdgdgrew@example.com',
        password: 'MyPass777!'
    }).expect(201)
})


test('login should fail', async()=>{
    await request(app).post('/user/login').send({
        name: 'noaa',
        email: 'noa16aa05@example.com',
        password: '160aa51605!'
    }).expect(400)
})
