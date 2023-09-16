const express = require ("express");
const app= new express();
const mongoose=require("mongoose");
const morgan =require("morgan");
const cors=require("cors");

require("dotenv").config();
app.use(morgan("dev"));
app.use(cors());

const signup=require("./routes/signup");
app.use("/api",signup)
const admin=require("./routes/admin")
app.use("/api",admin)

URL=process.env.URL;
PORT=process.env.PORT;

mongoose.connect(URL)
.then(()=>{
    console.log("Connected to movie db");  
    app.listen(PORT,()=>{
       console.log("SERVER IS RUNNING IN THE PORT "+PORT);
    })

})
.catch((e)=>console.log(e));
