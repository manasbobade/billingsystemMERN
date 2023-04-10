const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors=require("cors");
app.use(cors()); 
const bcrypt=require("bcryptjs");


const jwt=require("jsonwebtoken");
const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";



//mongodb atlas url
const mongourl="mongodb+srv://bhaveshdb:bhaveshdb@cluster0.buzoljl.mongodb.net/?retryWrites=true&w=majority"
//connect to the database
mongoose.connect(mongourl,{
  useNewUrlParser:true,
})
.then(()=>{
  console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./userdetails");
require("./invoicefill")

const User=mongoose.model("UserInfo")
const Invoice=mongoose.model("Invoices")










app.post("/loginuser", async (req, res) => {
  
  const { fname, passw } = req.body;

  const user = await User.findOne({ fname });
  if (!user) {
    return res.send({ eroor: "User Not found" });
    
  }
  if (await bcrypt.compare(passw, user.passw)) {
    const token = jwt.sign({fname:user,fname}, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});











app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    const userfname = user.fname;
    User.findOne({ fname: userfname })
      .then((data) => {
        res.send({ status: "ok", data: data });
      }) 
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) { }
});











app.post("/register",async(req,res)=>
{
  const{fname,passw}=req.body;

  const encrpyptedaadharcard=await bcrypt.hash(passw,10)
  try{
    const oldUser=await User.findOne({fname});
    if(oldUser){
      console.log(oldUser)
      if(await bcrypt.compare(passw, oldUser.passw)){
        console.log("aadhar number exists try again");
        return res.send({status:"User Exists"});
      } 
    }
    if(passw.length!==8){
      console.log("please enter 8 digit aadhar number");
      return res.send({status:"incorrect count"});
    }
    await User.create({
      fname,
      passw:encrpyptedaadharcard,
    });
    res.send({status:"ok"})
  }catch(error){
    res.send({status:"error1"})
  }
});




app.post("/filldetails",async(req,res)=>{
  const{customername,mobile,item,price,quantity,totalbill}= req.body;

  try{
    await Invoice.create({
          customername,
          mobile,
          item,
          price,
          quantity,
          totalbill,
                }
    );
    res.send({status:"ok"})
  }catch(error){
    res.send({status:"error"})
  }
});





//select port for listening
app.listen(5000,()=>{
  console.log("server started");
})
