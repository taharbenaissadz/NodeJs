const User = require("../models/User")
const bcrypt = require("bcrypt")
const Path = require("path")
module.exports = async (req,res)=>{
    try{
        const { username, password } = req.body;
        const checkUser = await User.findOne({username:username});
        if(checkUser){
            bcrypt.compare(password,checkUser.password).then((result)=>{
                if(result){
                    console.log(checkUser._id);
                    req.session.userId = checkUser._id
                    res.redirect("/")

                }
                else{

                    res.redirect("/auth/login")
                }
        })
        }else{
            res.redirect("/auth/login")
        }
    }catch(error){
        res.status(404)
        res.render("404");
    }
    
}