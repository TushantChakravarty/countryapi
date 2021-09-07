const express=require("express");
const path=require("path");
const app=express();
const port=process.env.PORT||300
const mongoose=require('mongoose');
const { json } = require("express");
const { stringify } = require("querystring");
const url='mongodb+srv://tushant07:tushant07@cluster0.b6dej.mongodb.net/country?retryWrites=true&w=majority'
var body_parser=require('body-parser');
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended:true
}));

mongoose.connect(url,{
    useNewUrlParser:true
});
const db=mongoose.connection
db.on('error',error=>console.error(error));
db.once('open',()=>{
    console.log('connected to database');
})
var nameschema=new mongoose.Schema({
    data:String,
})
var user=mongoose.model("user",nameschema);
app.use("/public",express.static("static"));
app.post("/save",(req,res)=>{
    var mydata=new user(req.body);
   setTimeout(() => {
    mydata.save()
    .then(item=>{
        res.send('item saved to database');
    })
   }, 5000);
    
    var response={
        data:req.body
    }
    
    console.log(JSON.stringify(response));
    
})
app.get('/',(req,res)=>{
    
    res.sendFile(path.join(__dirname,"static","index.html"));
}).listen(port);
