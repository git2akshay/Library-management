const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuid =require('uuid')
//const { randomUUID } = require('crypto');


app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Library application. Take Books quickly. Organize and keep track of all your Books."});
});

// get all books

app.get("/allbooks",(req,res)=>{

    Book.find({},(err,foundItems)=>{
        console.log(foundItems);
        // res.render("list", {listTitle: "Today", newListItems : foundItems});
        res.send(foundItems)

    })
    
});
app.get('/name',(req,res)=>{
    Book.find((err,books)=>{
    if(err){
        console.log(err);
    }else{
        console.log(books);
        books.forEach((book) => {
            console.log(book.name);
            // res.send(book.name) ;
        });
    } 
  
   });
   
})

app.post('/login',(req,res)=>{
    if(!req.header('username')){
        return res.status(400).send("No token")
    }
    if(req.header('username')!=='123456'){
        return res.status(401).send("not authuraised");
    }
    return res.send("logined")
});


app.post('/login/book',(req,res)=>{
    const {name, author, id} = req.body;
    const bookData =  {
        name,
        author,
        id,
    };
    const book = new Book (bookData);
    book.save();
    console.log(book);
    res.status(200).json(book);
});

app.delete('/book/delete/:id',(req,res)=>{
    res.send(req.params.id);

});



//mongoose connection
mongoose.connect("mongodb://localhost:27017/bookDB", { useNewUrlParser: true });

//schema definition
const bookSchema = new mongoose.Schema ({
    name : String,
    author : String,
    id:Number  

     
});

//scheama model
const Book = mongoose.model("Book",bookSchema);


    // Book.find((err,books)=>{
    //     if(err){
    //         console.log(err);
    //     }else{
    //         // res.json(books)
    //         // // console.log(books);
    //         books.forEach((book) => {
    //             msg = `Author: ${book.author}\nBook: ${book.name}\n \n`
    //             res.write(msg)
    //         });
    //     }
    //     res.end()
    // });


//list of books

const book1 = new Book ({
    name: "My Journey",
    author : "Dr. A.P.J. Abdul Kalam	",
    id:001
});
const book2 = new Book ({
    name:"Making of New India",
    author : "Dr. Bibek Debroy	",
    id:002
});
const book3 = new Book ({
    name: "Whispers of Ti",
    author :"Dr. Krishna Saksena" ,
    id:003
});



// Book.find((err,books)=>{
//     if(err){
//         console.log(err);
//     }else{
//         console.log(books);
//         books.forEach((book) => {
//             console.log(book.name);
//         });
//     }
// });

// Book.insertMany([book1,book2,book3],(err)=>{
//     if(err){
//         console.log(err);

//     }else{
//         console.log("Sucesfully");
//     }
// });

app.listen(8081,()=>{
    console.log("the serve is runing")
});

