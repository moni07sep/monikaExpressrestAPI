let express= require("express");
let joi=require("@hapi/joi")
let router =express.Router();
let User =require("../modeldb/user")
//update
router.put("/userupdate/:id", async (req,res)=>{
let user=await User.findById(req.params.id);
if (!user){return res.status(404).send({ message: "Invalid user id" })}
let{error}=userValidataionError(req.body);
if (error) { return res.send(error.details[0].message) };
//let {firstname,lastname,adress,userLogin}=req.body;

user.firstname=req.body.firstname,
user.lastname=req.body.lastname,  
user.adress.city=req.body.adress.city,
user.adress.country=req.body.adress.country,
user.adress.state=req.body.adress.state,
user.userLogin.emailid=req.body.userLogin.emailid,
user.userLogin.password=req.body.userLogin.password    

let data=await user.save();
res.send({ d: data });

})


//delete

router.delete("/userdelete/:id",async(req,res)=>{
    let user =await User.findByIdAndRemove(req.params.id);
    if(!user) {return res.status(403).send({message:"invalid id"})}
    res.send({ message: "Thank you ! come back again " });
})

//insert

router.post("/createnewuser", async(req,res)=>  {

    let user= await User.findOne({"userLogin.emailid":req.body.emailid});
    if(!user) {return res.status(403).send({message:"already exist"})}
    let {error}=userValidataionError(req.body);
    if(error){return res.send(error.details[0].message)};
    let {firstname,lastname,adress,userLogin}=req.body;
    let newUser = new User({
        firstname,
        lastname,
        adress,
        userLogin
    });
    
    // let newuser =new User({
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname,
    //     adress:req.body.adress,
    //     userLogin:req.body.userLogin,
    //     emailid:req.body.userLogin.emailid,
    //     password:req.body.userLogin.password,
    //     city:req.body.adress.city,
    //     country:req.body.adress.country,
    //     state:req.body.adress.state,
    // })   
    let data=await newUser.save();
    res.send({message:"thankyou"})
})

router.get("/fetchuser",async(req,res)=>{
    let data =await User.find();
    res.send(console.log(data))

})

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
module.exports = router;