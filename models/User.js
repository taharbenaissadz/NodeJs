const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:{type: String, required: [true,"Ops Empty UserName , Please Provide Username "], unique: true},
    password: {type: String, required: [true,"Ops Empty Password , Please Enter Password"]}
})
userSchema.pre("save", async function (next){
    const user =   this 
    const passEncrypt = await bcrypt.hash(user.password, 10);
    
    if(passEncrypt)
        user.password = passEncrypt
        next()
    
})
const User = mongoose.model("User",userSchema)
module.exports = User;