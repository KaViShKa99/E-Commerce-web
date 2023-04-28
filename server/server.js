const express = require("express");
const cors = require('cors');
const userRouter = require('./routes/userRouter')


const app = express()
app.use(cors());
app.use(express.json());

app.use("/user",userRouter)

app.listen(5000, () => console.log("app started at 5000..."));