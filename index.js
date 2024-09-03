const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const expressSession = require("express-session");
global.loggedIn = null;
const fileUpload = require("express-fileupload");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: true}))
app.use(fileUpload())
app.use(bodyParser.json())
app.use(expressSession({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
}))
app.set("view engine","ejs")
app.use("*",(req,res,next)=>{
    loggedIn = req.session.userId;
    next();
})
mongoose.connect("mongodb+srv://taharbenaissa:90123654789@cluster0.wn7cfzq.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0");

const validateMiddleWare = (req,res,next)=>{
    if(req.files == null || req.body.title == null || req.body.title == null){
        return res.redirect('/posts/new')
    }
    next()
}
    
app.use('/posts/store',validateMiddleWare)

app.get('/contact',(req,res)=>{
    //res.sendFile(path.resolve(__dirname,'pages/contact.html'))
    res.render("contact");
})
app.get("/about",(req,res)=>{
    //res.sendFile(path.resolve(__dirname,"pages/about.html"))
    res.render("about");
})   

const newPostController = require('./controllers/newPosts')
const homeController = require('./controllers/home')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const newUserController = require('./controllers/newUser')
const storeUserController = require('./controllers/storeUser')
const loginUserController = require('./controllers/loginUser')
const validationUserController = require('./controllers/validationUser')
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware')


app.get("/",homeController);
app.get('/posts/new',newPostController)
app.post("/posts/store", storePostController )
app.get("/post/:id",getPostController ) 
app.get('/auth/register', redirectIfAuthenticatedMiddleware, newUserController)
app.post('/users/register', redirectIfAuthenticatedMiddleware, storeUserController)
app.get('/auth/login', redirectIfAuthenticatedMiddleware, loginUserController)
app.post('/users/login',redirectIfAuthenticatedMiddleware, validationUserController)

app.use((req,res)=> res.render("404"))
let port = process.env.PORT;
if (port == null || port == "") {
    port = 4000;
}
app.listen(port)