const BlogPost = require('../models/BlogPost.js')
module.exports = async (req,res)=>{
    const AllPosts = await BlogPost.find({}).populate('userId');
    console.log(req.session);
    res.render('index',{
        AllPosts
    });

}