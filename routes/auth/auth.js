let express =require("express");
let router=express.Router();
let joi=require("@hapi/joi");
let bcrypt =require("bcrypt");
let jwt=require("jsonwebtoken");
let config=require("config")
let User=require("../../modeldb/user");

router.post("/auth",async(req,res)=>{
    let email =await User.findOne({"userLogin.emailid":req.body.userLogin.emailid});
    if(!email) {res.status(403).send({message:"invalid email"})};
    let password=await bcrypt.compare(req.body.userLogin.password,email.userLogin.password);
    //let password =await User.findOne({"userLogin.password":req.body.userLogin.password});
    if (!password) {res.status(403).send({message:"invalid password"})};

    //let token =jwt.sign({_id:email._id},config.get("moniapi"))
    let token = email.Tokenperson();
    res.send({token:token});
})

function userValidationError(error){
    let schema =joi.object({
        userLogin :{
        emailid:joi.string().required(),
        password:joi.string().required()
    }
    });
    return schema.validate(error)
}

module.exports = router;