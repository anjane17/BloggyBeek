
const express =require("express");
const { getAllBlogs, addBlog, updateBlog, deleteBlog, getById, getByUserId } = require("../controllers/blog-controllers");

const blogRouter = express.Router();

blogRouter.get('/',getAllBlogs);

blogRouter.post('/add-blog',addBlog);

blogRouter.put('/update/:id',updateBlog);

blogRouter.delete('/delete/:id',deleteBlog);

blogRouter.get('/get-by-id/:id',getById);

blogRouter.get('/user/:id',getByUserId);
module.exports = blogRouter;