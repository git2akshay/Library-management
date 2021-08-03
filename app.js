const path =  require('path');
const express =require('express');
const app = express();
const bodyParser =require('body-parser');

app.use(express.json());
//app.use(bodyParser.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    res.send("hi");
})

app.post('/contact',(req,res)=>{
   if(!req.body.name){
       return res.status(400).send("name is require");
   }
    res.status(201).send(`the name is ${req.body.name}`)
});


app.post('/login',(req,res)=>{
    if(!req.header('x-auth-token')){
        return res.status(400).send("No token")
    }
    if(req.header('x-auth-token')!=='123456'){
        return res.status(401).send("not authuraised");
    }
    return res.send("logined")
});

app.put('/post/:id',(req,res)=>{
    res.json({
        id:req.params.id,
        title:req.body.title
    });
});




app.listen(5000,()=>{
    console.log("the serve is runing")
});
