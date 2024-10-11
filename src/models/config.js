const mongoose = require('mongoose');  
 
mongoose.connect(process.env.MONGODB_URI,{dbName: 'iceplant',}).then(() => {console.log("Mongo DB Connected");}).catch((err) => {console.log("ERROR! Not Able to Connect Mongo DB", err);});