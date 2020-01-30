let mongoose = require("mongoose");
let jwt=require("jsonwebtoken");
let config =require("config");
let joi=require("@hapi/joi")

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

function userValidataionError(error){

    let schema=joi.object({
        firstname:joi.string().min(4).max(10).required(),
        lastname:joi.string().min(4).max(10).required(),
    adress:{
        country:joi.string().required(),
        state:joi.string().required(),
        city:joi.string().required()   
    },
    userLogin:{
        emailid:joi.string().required(),
        password:joi.string().min(4).max(15).required()
    }

    })
    return schema.validate(error)
}


let userModel= mongoose.model("users",usersechma)

module.exports={userValidataionError,userModel};
