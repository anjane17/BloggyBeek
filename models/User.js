const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required : true,
        minlength : 6,
    },
    blogs:[{
        type:mongoose.Types.ObjectId,
        required:true,
        ref:"Blog"
    }]
});

const User = mongoose.model("User",userSchema);
module.exports = User;