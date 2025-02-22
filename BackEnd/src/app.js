const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const Connection = require('./database/db.js')
const User = require('./schema/User-schema.js')

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const aiRoutes = require('./routes/ai-routs.js')

app.use(express.json())

app.use(cors())

Connection()

app.get('/', (req, res) =>{
    res.send("Hello")
})

app.use('/ai', aiRoutes)

app.post('/register', async (req, res)=>{
    const { uName, uemail, upassword } = req.body

    try{
        const hashedPassword = await bcrypt.hash(upassword, 10)
        const user = new User({ UserName : uName, Email : uemail, Password : hashedPassword })
        console.log(uName, uemail, user.save())
        user.save()
        return res.status(201).json({ message:"User Registered Sucessfully" })
    }catch(error){
        console.log("Error While Routing", error)
        return res.status(400).json({ error:"Error While Registering" })
    }
})

app.post('/login', async (req, res) =>{
    const { uemail, upassword } = req.body

    try{
        const user = await User.findOne({Email:uemail})
        if(!user) return res.status(400).json({ error:'Invalid Username or Password' })
            
        const ismatch = await bcrypt.compare(upassword, user.Password)
        if(!ismatch) return res.status(400).json({ error:'Invalid Username or Password' })
        
        const token = jwt.sign({ id:user._id }, "123459")
        res.status(200).json({ message:'Login Sucessfull', token })
    }catch(error){
        console.log("Error While Login")
        res.status(400).json({error: 'Error While Login'})
    }
})

const authenticate = (req, res, next) =>{
    const token = req.header('Authorization');
    if(!token) return res.status(400).json({error : 'Access Failed'})
    
    try{
        const verify = jwt.verify(token, "123459")
        req.user = verify
        next()
    }catch(error){
        res.status(400).json({error : 'Invalid Token'})
    }
}

app.get('/users', authenticate, async (req, res) =>{
    try{
        const webUser = await User.findById(req.user.id)
        res.status(200).json(webUser)
    }catch(error){
        res.status(500).json({error : 'Server Error'})
    }
})

module.exports = app