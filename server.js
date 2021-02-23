//require express
const express = require("express");
//initialize express
const app = express();

//require db
const connectDB=require("./config/connectDB")


//4.parse data
app.use(express.json())

//3.routers
app.use("/persons",require("./routes/person"))


//2.connectDB
connectDB();
//1-create server at port 5000

const port = process.env.PORT || 5000;

app.listen(port, (err) => {
      err?console.log(err):console.log(`server running  at http://localhost:${port}`)
})