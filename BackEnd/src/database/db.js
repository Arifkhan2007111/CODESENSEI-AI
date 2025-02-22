const mongoose = require('mongoose')

const Connection = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Database Connected")
    }catch(error){
        console.log("Error", error)
    }
}

module.exports = Connection