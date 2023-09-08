const { default: mongoose } = require("mongoose");
const Blog = require("../models/Blog");
const User = require("../models/User");

exports.getAllBlogs = async(req,res,next)=>{
let blogs;
try{
    blogs = await Blog.find().populate("user");
}catch(err){
    console.log(err);
}

if(!blogs){
       return res.status(404).json({
            success:false,
            message:"Blog Not Found",
        })
}
res.status(200).json({blogs});
}


//Adding a new blog
exports.addBlog = async(req,res,next) =>{
   
    const {title, description, image, tag, user} = req.body;
    let existingUser;
    try{
      existingUser = await User.findById(user);
    }catch(err){console.log(err)}

    if(!existingUser){
        return res.status(400).json({
            message:"User Not Found By id"
        })
    }
    date = Date.now();
    const blog = new Blog({
        title, description, image, tag, user,date
    })
    try{
        const session = await mongoose.startSession();
        session.startTransaction();
       await blog.save(session);
       existingUser.blogs.push(blog);
       await existingUser.save(session);
       await session.abortTransaction();
    }catch(err){
        console.log("daal me kuch kala h");
       return  console.log(err);
    }

    return res.status(201).json({blog});
}

// Update the Blog

exports.updateBlog = async (req,res,next) =>{
    const {title,description} = req.body;
    const BlogId = req.params.id;

    let blog;
    try{
      blog  = await Blog.findByIdAndUpdate(BlogId,{
        title,description
      })
    }catch(err){
        return console.log(err)
    }
    if(!blog){
        return res.status(400).json({message:"Unable to update the Blog"})
    }

    return res.status(200).json({message:"Blog Updated successfully"})
}

//Delete the Blog

exports.deleteBlog = async(req,res,next)=>{
    const BlogId = req.params.id;

    let blog;
    try{
      blog  = await Blog.findByIdAndRemove(BlogId).populate("User");
      if(!blog){
        return res.status(400).json({message:"Unable to delete the Blog"})
    }

       blog.user.blogs.pull(BlogId);
       blog.user.save();
    }catch(err){
        console.log("ky error h bhai")
        return console.log(err)
    }
    
    return res.status(200).json({message:"Blog deleted successfully"})

}

//get by id

exports.getById = async(req,res,next)=>{
let blogs;
const BlogId = req.params.id;
try{
    blogs = await Blog.findById(BlogId);
}catch(err){
    console.log(err);
}

if(!blogs){
       return res.status(404).json({
            success:false,
            message:"Blog Not Found",
        })
}
res.status(200).json({blogs});
}

// 03:08 edit it

exports.getByUserId = async(req,res,next) => {
    const userId = req.params.id;
    let userBlogs;
    try{
        userBlogs = await User.findById(userId).populate("blogs");
       }
       catch(err){
        return console.log(err);
       }
       if(!userBlogs){
        return res.status(404).json({message:"No Blog Found"});
       }
       return res.status(200).json({blogs:userBlogs})
}