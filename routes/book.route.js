const express= require("express");
const { BookModel } = require("../models/Book.model");

const bookRouter= express.Router();

bookRouter.use(express.json());


bookRouter.get("/", async(req, res)=>{
    const query= req.query;
    try {
        const data= await BookModel.find(query);
        res.send(data);
    } catch (error) {
        res.send({"msg": "Something went wrong"});
        console.log({"ERROR":error});
    }
})

bookRouter.post("/add", async(req, res)=>{
    const data= req.body;
    try {
        const newdata= new BookModel(data);
        await newdata.save();
        res.send("Added new book data");
    } catch (error) {
        res.send({"msg": "Unable to add book data"});
        console.log({"ERROR":error});
    }
})

bookRouter.patch("/update/:id", async(req, res)=>{
    const data= req.body;
    const id= req.params.id;
    const book= await BookModel.findOne({"_id":id});
    const id_in_book= book.userId;
    const id_making_req= req.body.userId;
    try {
        if(id_in_book!==id_making_req){
            res.send({"msg":"You are not Auuthorized"});
        }else{
            await BookModel.findByIdAndUpdate({"_id":id}, data);
            res.send(`Upadted Book data having id ${id}`);
        }
    } catch (error) {
        res.send({"msg": "Something went wrong"});
        console.log({"ERROR":error});
    }
})

bookRouter.delete("/", async(req, res)=>{
    const id= req.params.id;
    const book= await BookModel.findOne({"_id":id});
    const id_in_book= book.userId;
    const id_making_req= req.body.userId;
    try {
        if(id_in_book!==id_making_req){
            res.send({"msg":"You are not Auuthorized"});
        }else{
            await BookModel.findByIdAndDelete({"_id":id});
            res.send(`Deleted Book data having id ${id}`);
        }
    } catch (error) {
        res.send({"msg": "Something went wrong"});
        console.log({"ERROR":error});
    }
})


module.exports= {
    bookRouter
}