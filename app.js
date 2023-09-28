const express = require ("express");
const app= new express();
const mongoose=require("mongoose");
const morgan =require("morgan");
const cors=require("cors");
const bodyParser = require('body-parser');

require("dotenv").config();
app.use(morgan("dev"));
app.use(cors());
const nodemailer = require('nodemailer');
app.use(bodyParser.json());


const signup=require("./routes/signup");
app.use("/api",signup)
const admin=require("./routes/admin")
app.use("/api",admin)
const movie=require("./routes/movie")
app.use("/api",movie)

const transporter = require('./routes/emailConfig');


URL=process.env.URL;
PORT=process.env.PORT;

// Allow requests from a specific origin (e.g., your frontend URL during development)
const allowedOrigins = ["http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors(corsOptions));

mongoose.connect(URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    app.listen(PORT,()=>{
       console.log("SERVER IS RUNNING IN THE PORT "+PORT);
       console.log("Connected to atlas");
    })

})
.catch((e)=>console.log(e));
