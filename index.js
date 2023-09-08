const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const upload = require("./routes/user-route");
const blogRouter = require("./routes/blog-route");
app.use(cors());
app.use(express.json()); // ye important h ye batata h ki post request se kis type ka data aane wala h
app.use("/api/user",upload);
app.use("/api/blog",blogRouter);


mongoose.connect("mongodb+srv://abhi:codewithabhi@cluster0.hrs1ylr.mongodb.net/BlogApp?retryWrites=true&w=majority").then(()=>{app.listen(4000)}).
then(()=>{console.log("App started at port no 4000")}).catch((err)=>{console.log(err)});
