//require mongoose
const mongoose = require("mongoose");
//require config
const config = require("config");

//using mongoose connect methode to connect at mongoDB

const connectDB = () => {
      mongoose
            .connect(config.get("MONGO_URI"), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            })
            .then(console.log("mongoose is connect"))
            .catch(err => console.log(err))
};

//export module

module.exports = connectDB;