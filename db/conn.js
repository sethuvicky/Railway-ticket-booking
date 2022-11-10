const mongoose = require("mongoose");

const DB = 'mongodb://localhost:27017/railway'


mongoose.connect(DB,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=> console.log("connection start")).catch((error)=> console.log(error.message));