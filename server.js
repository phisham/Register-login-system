const express=require("express");
const bodyParser=require("body-parser");
const { ifError } = require("assert");
const app=express();
const fs=require('fs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.get("/done",function(req,res){
    res.sendFile(__dirname+"/index2.html");
});

app.post("/",function(req,res){
   var n1=req.body.one;
   var n2=req.body.two;

   var fileuser=fs.appendFile('nameuser.txt',n1+' ',function(err){
       if(err) throw err;
   });
   
   var filepass=fs.appendFile('namepass.txt',n2+' ',function(err){
       if(err) throw err;

   })



 res.send("Successfully Registered!!");

})
app.post("/done",function(req,res){
    var n3=req.body.ONE;
    var n4=req.body.TWO;
    
      
     for(var i=1;i<2;i++){
      var fr=fs.readFile('nameuser.txt','utf-8',function(err,n1){
          if(err) throw err;
          var h=n1.search(n3+' ');
          if(h==-1){
            res.send("Login Failed!!");
          }
          
      })
      var fr3=fs.readFile('namepass.txt','utf-8',function(err,n2){
          if(err) throw err;
          var k=n2.search(n4+' ');
          if(k==-1){
              res.send("Login Failed!!");
          }
          else res.send("Login Successful!!!");
      })
      




    }


   

})


 
    



app.listen(3600,function(){
    console.log("Server has started on port 3600");
});
