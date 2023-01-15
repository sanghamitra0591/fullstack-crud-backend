const express= require("express");

const app= express();

app.use(express.json());

require("dotenv").config();

const cors= require("cors");
const { connection } = require("./configs/db");
const {userRouter}= require("./routes/user.route");
const { authenticate } = require("./middlewares/authenticate.middleware");
const { bookRouter } = require("./routes/book.route");

app.use(cors({
    origin: "*"
}))

app.get("/", (req, res)=>{
    res.send("Welcome To Home Page");
})

app.use("/user", userRouter);


app.use(authenticate);
app.use("/book", bookRouter);



app.listen(process.env.port, async ()=>{
    try {
        await connection;
        console.log("Connected to Database");
    } catch (error) {
        console.log({"Error":error});
    }
    console.log(`Running at port ${process.env.port}`);
})