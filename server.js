const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/userModel");
require('dotenv').config();
const dbURI = process.env.DATABASE_URI;

const app = express();

app.use(express.json())

app.get("/" , (req,res)=>{
    res.send("Hello from Diya")
})

app.get("/users",async(req, res)=>{
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.get("/users/:id" , async(req,res)=>{
    try {
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
       res.status(500).json({message: error.message}) 
    }
})

app.post("/users",async(req,res)=>{
    try {
        const user = await  User.create(req.body)
        res.status(200).json(user);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

app.put("/users/:id" , async(req, res)=>{
    try {
        const{id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if(!user){
            return res.status(400).json({message: `Cannot find any user with ID ${id}`})
        }
        const updatedUser = await User.findById(id);
        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

app.delete("/users/:id", async(req, res) =>{
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(400).json({message:`Cannot find any user with ID ${id}`})
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message}) 
    }
})


mongoose
.connect(dbURI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log("connected to MongoDB")
    app.listen(3000, ()=>{
        console.log("NodeAPI is running on port 3000")
    });
})
.catch(()=>{
    console.log(error);
})