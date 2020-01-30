let mongoose =require("mongoose");

mongoose.connect("mongodb://localhost/monidb",{ useNewUrlParser: true,useUnifiedTopology: true}).then(()=>console.log("connected db"))
.catch(err=>console.log(`somthing went wrong ${err.message}  `));

let userSchema= new mongoose.Schema({
    firstname:{type:String ,required:true},
    lastname:{type:String ,required:true},
    email: {type:String, require:true}
})

let movieSchema= new mongoose.Schema({
    name:{type:String},
    //userid:{type:mongoose.Schema.Types.ObjectId,ref:"customer"}
    // actor:{type:String},
    // stock:{type:Number}
    //userid:{type:userSchema}
    userid:[userSchema]
})

// let usermovieSchema =new mongoose.Schema({
//     userid:{type:Number},
//     movieid:{type:Number}
// })

let user =mongoose.model("customer",userSchema)
let movie =mongoose.model("movies",movieSchema)
//let usermovie = mongoose.model("usermovies",usermovieSchema)

async function createnewuser(fn ,ln,em){
    let data = new user(
        {
            firstname:fn,
            lastname:ln,
            email:em
        }
    )
    let item =await data.save();
    console.log(item);
}
// createnewuser("moni","verma","m@gmail.com");

async function createmove(nm ,id){
    let data =new movie(
        {
            name:nm,
            userid:id
        }
    )
    let item =await data.save();
    console.log(item);
}
// createmove("batman","5e317c2802f60c4dfcac9198");
createmove("superman",[new user({
    firstname:"monika",
            lastname:"kapoor",
            email:"k@gmail.com",
            
}),new user({
    firstname:"moni",
            lastname:"kverma",
            email:"kv@gmail.com",
            
})]
);

async function fetchMovies(){
    let data =await movie.find().populate("userid");
    console.log(data);

}
//fetchMovies();