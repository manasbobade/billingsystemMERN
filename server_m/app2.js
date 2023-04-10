const express=require("express");
const app1=express();
const mongoose=require("mongoose");
app1.use(express.json());


const mongourl="mongodb+srv://manasdatabase:manasdatabase@cluster0.uia5kq5.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(mongourl,{
    useNewUrlParser:true,
})
.then(()=>{
    console.log("connected to database");
})
.catch((e)=>console.log(e));

app1.listen(5000,()=>{
    console.log("server started");
})

app1.post("/post",async(req,res)=>{
    console.log(req.body)   
    const {data}=req.body

    try{
        if(data=="manas"){
            console.log("hi there")
            res.send({status:"ok"})
        } 
        else{
            res.send({status:"user not found"})
        }
    }

    catch(error){
        res.send({status:"something went wrong error"})
    }
    
});

require("./userdetails");

const User=mongoose.model("UserInfo");
app1.post("/register",async(req,res)=>{
    const {name,email,MobileNo}=req.body;
    try{
        await User.create({
        uname:name,
        email,
        phoneNo:MobileNo,    
        });
        res.send({status:"Ok"});
    }
    catch(error){
        res.send({staus:"Error"});

    }
})
