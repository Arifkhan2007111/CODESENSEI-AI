const aiServices = require('../services/AI-services.js')

module.exports.getReview = async (req, res) =>{
    const code = req.body.prompt

    if(!code){
        return res.status(400).send("Code is required")
    }

    const response = await aiServices(code)

    res.send(response)
}