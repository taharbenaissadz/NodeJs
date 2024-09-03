const User = require("../models/User")
const Path = require("path")
module.exports = async (req,res)=>{
    try{
        const userCreate = await User.create(req.body)
        res.redirect("/")
    }catch(error){
        const validationErrors = Object.keys(error.errors).map(key => error.errors[key].message)
        req.session.validationErrors = validationErrors
        res.status(404)
        res.redirect("/auth/register");
        
    }
    
}