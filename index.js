let express= require("express")
let mongoose = require("mongoose")
let app=express();
app.use(express.json());

let port =process.env.PORT || 4600;
let user =require("./routes/user.routes");
let auth =require("./routes/auth/auth")

mongoose.connect("mongodb://localhost/monidb", { useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("db connect"))
.catch(err=>console.log(`something went wrong ${err.message}`));

app.use("/api",user);
app.use("/api",auth);

app.listen(port,()=>console.log(`working port is: ${port}`));