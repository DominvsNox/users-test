const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
require('dotenv').config()
const userEmailRouter = express.Router()

userEmailRouter.use(bodyParser.urlencoded({extended:true}))
userEmailRouter.use(bodyParser.json())

const userSchema = new mongoose.Schema({
    name: String,
    surname: String,
    email: String
})

const User = mongoose.model('User', userSchema)

userEmailRouter.get('/', (req, res)=>{
    try{
        const name = req.query.name
        const surname = req.query.surname
        const age = req.query.age
        const email = req.query.email
        if(age<18){
            res.send('Age is lower than 18!')
        }
        else{
            mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
                if(err){
                    console.log(err)
                    return res.sendStatus(500)
                }
                
                const user = new User({
                    name:name,
                    surname:surname,
                    email:email
                })

                user.save((err, data)=>{
                    if(err){
                        console.log(err)
                        res.sendStatus(500)
                    }
                    else{
                        console.log('Done!')
                        res.send('Done!')
                        
                    }
                })

            })
        }

    }
    catch(err){
        res.send(`Error! ${err}`)
    }
})

userEmailRouter.get('/findByEmail', (req, res)=>{
    const email = req.query.email

    mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
    })

    User.find({email:email}, (err, data)=>{
        if(err){
            console.log(err)
            return res.sendStatus(500)
        }
        const list = []
        data.forEach(el => {
            list.push(`${el.name} ${el.surname}`)
        })
        res.send(list)
    })
})

module.exports = userEmailRouter