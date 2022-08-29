const express = require('express')
const axios = require('axios')
const fs = require('fs')
const bodyParser = require('body-parser')
const usersFromApiRouter = express.Router()

usersFromApiRouter.use(bodyParser.urlencoded({extended:true}))
usersFromApiRouter.use(bodyParser.json())

usersFromApiRouter.get('/', (req, res)=>{
    axios.default.get('https://reqres.in/api/users')
    .then(data=>{
    console.log(data.data.data)
    let users = data.data.data
    const info = []
    users.forEach(el => {
        info.push({
            "ID" : el.id,
            "Email" : el.email,
            "FirstName" : el.first_name,
            "LastName" : el.last_name
        })
    })
    console.log(info)
    fs.writeFileSync('USERS.CSV', JSON.stringify(info))
    res.send('File created!')
})
.catch(err=>{
    res.send(err)
})
})


module.exports = usersFromApiRouter