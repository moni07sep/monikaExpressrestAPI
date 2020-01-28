let mongoose = require("mongoose");
let jwt=require("jsonwebtoken");
let config =require("config");
//let config = require("config");

let usersechma=new mongoose.Schema({
    firstname:{type:String ,min:4 ,max:5 ,trim :true ,required:true},
    lastname:{type: String , trim :true ,required:true},
    adress:{
        country:{type:String, required:true},
        state:{type:String, required:true},
        city:{type:String, required:true},
    },
    userLogin:{
        emailid:{type:String, required:true, unique:true},
        password:{type:String, required:true, min:4, max:15}
    }
})

usersechma.methods.Tokenperson=function(){
    let token = jwt.sign({_id:this._id},config.get("moniapi") );
    return token;
}


let userModel= mongoose.model("users",usersechma)

module.exports=userModel;
