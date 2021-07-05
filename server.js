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
   var n=n1.concat(n2);

   var sec=fs.readFile('namereg.txt','utf-8',function(err,data){
       if(err) throw err;
       var a=data.search(n1);
       var b=data.search(n2);
       if(n1=='' || n2==''){
           res.send("Enter username/password");
       }
       else if(a!=-1 || b!=-1){
           res.send("This username/password exist !!!please change the username/password.");
       }
       else {
            var fileuser=fs.appendFile('namereg.txt',n+' ',function(err){
                    if(err) throw err;
                    res.send("Successfully Registered!!!");
            });
   
       }

   })
   
 

})
app.post("/done",function(req,res){
    var n3=req.body.ONE;
    var n4=req.body.TWO;
    var read_n=n3.concat(n4);
     
      var fr=fs.readFile('namereg.txt','utf-8',function(err,data){
          if(err) throw err;
          var h=data.search(read_n+' ');
          if(h==-1 || n3=='' || n4==''){
            res.send("Login Failed!!");
          }
          else res.send("Login Successful!!!")
      })
     
      
})


app.listen(3600,function(){
    console.log("Server has started on port 3600");
});
