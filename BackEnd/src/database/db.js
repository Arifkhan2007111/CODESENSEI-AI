const mongoose = require('mongoose')

const Connection = async ()=>{
    try{
        await mongoose.connect("mongodb+srv://Codesensei-User1:lUHfTrbYgkbgUtWX@codesensei.ml89n.mongodb.net/?retryWrites=true&w=majority&appName=Codesensei")
        // console.log(process.env.MONGO_URL)
        console.log("Database Connected")
    }catch(error){
        console.log("Error", error)
    }
}

module.exports = Connection