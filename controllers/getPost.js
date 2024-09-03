const BlogPost = require('../models/BlogPost.js')
module.exports = async (req, res) =>{
    try {
        const blogPostById = await BlogPost.findById(req.params.id).populate('userId');
        console.log(blogPostById.userId);
        res.render("post",{blogPostById});
    } catch (error) {
        res.status(404)
        res.render("404");
    }
}
