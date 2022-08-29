const express = require('express')

const PORT = 5000
const app = express()
app.listen(PORT, ()=>console.log(`App runs on port ${PORT}`))

const userRouter = require('./routes/user_router')
const userEmailRouter = require('./routes/user_email_router')
const usersFromApiRouter = require('./routes/users_from_api')

app.get('/', (req, res)=>{
    res.send('You are at root point')
})

app.use('/user', userRouter)
app.use('/user-email', userEmailRouter)
app.use('/users-from-api', usersFromApiRouter)