let express= require("express");
let router =express.Router();
let bcrypt =require("bcrypt");
let User =require("../modeldb/user")
//update
router.put("/userupdate/:id", async (req,res)=>{

let user=await User.userModel.findById(req.params.id);
if (!user){return res.status(404).send({ message: "Invalid user id" })}
let{error}=User.userValidataionError(req.body);
if (error) { return res.send(error.details[0].message) };
//let {firstname,lastname,adress,userLogin}=req.body;

user.firstname=req.body.firstname,
user.lastname=req.body.lastname,  
user.adress.city=req.body.adress.city,
user.adress.country=req.body.adress.country,
user.adress.state=req.body.adress.state,
user.userLogin.emailid=req.body.userLogin.emailid,
user.userLogin.password=req.body.userLogin.password    

let data=await  User.userModel.save();
res.send({ d: data });

})


//delete

router.delete("/userdelete/:id",async(req,res)=>{
    let user =await User.userModel.findByIdAndRemove(req.params.id);
    if(!user) {return res.status(403).send({message:"invalid id"})}
    res.send({ message: "Thank you ! come back again " });
})

//insert

router.post("/createnewuser", async(req,res)=>  {
   
    let user1= await User.userModel.findOne({"userLogin.emailid":req.body.userLogin.emailid});
    if(user1) {return res.status(403).send({message:"already1 exist"})}
    let {error}=User.userValidataionError(req.body);
    if(error){return res.send(error.details[0].message)};
    let {firstname,lastname,adress,userLogin}=req.body;
    let newUser = new User({
        firstname,
        lastname,
        adress,
        userLogin
    });
    
    let salt= await bcrypt.genSalt(10);
    newUser.userLogin.password=await bcrypt.hash(newUser.userLogin.password,salt)

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
    let data =await User.userModel.find();
    res.send(console.log(data))

})


module.exports = router;