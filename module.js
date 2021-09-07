const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const uuid =require('uuid')

app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json({"message": "Welcome to Library application. Take Books quickly. Organize and keep track of all your Books."});
});

//mongoose connection
mongoose.connect("mongodb://localhost:27017/bookDB", { useNewUrlParser: true , useUnifiedTopology: true });

//schema definition
const bookSchema = new mongoose.Schema ({
    name : String,
    author : String,
    id:Number  
});

//scheama model
const Book = mongoose.model("Book",bookSchema);

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
    name: "A Bouquet Of Flowers",
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


// get all books
app.route("/book")
.get((req,res)=>{
    if(!req.query.book){
       Book.find({},(err,foundItems)=>{
           // console.log(foundItems);
           // res.render("list", {listTitle: "Today", newListItems : foundItems});
           res.send(foundItems);
   
       })   
    }else{
        console.log(req.query.book);
        Book.findOne({name:req.query.book},(err,bookData)=>{
            res.send(bookData)
        });
    }
   }).post((req,res)=>{
    //     const {name, author, id} = req.body; 
    //     const bookData =  {
    //         name,
    //         author,
    //         id,
    //     };
      const book = new Book ({
            id:req.body.id,
            name:req.body.name,
            author:req.body.author
    
    });
        book.save((err)=>{
            if(!err){
                res.send("Sucessfully added");
            } else {
                res.send(err);
            }
        });
    //     console.log(book);
    //     res.status(200).json(book);
     })
     .delete((req,res)=>{
        Book.deleteMany((err)=>{
            res.send("sucessfully Deleted");
        })
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

////////////////Request Targetting a specific Article ////////////
app.route("/book/:bookName")

.get((req,res)=>{
    Book.findOne({name:req.params.bookName},(err,foundItem)=>{
        if(foundItem){
            res.send(foundItem);
        }else{
            res.send("no match data");
        }
    });
})

.put((req,res)=>{
    Book.updateOne({name:req.params.bookName},
        {name:req.body.name},
        {overwrite:true},
          (err)=>{
            if(!err){
                res.send("Sucessfully updated")
            }
     });
    
})

.delete((req,res)=>{
    Book.deleteOne({name:req.params.bookName},(err)=>{
        if(!err){
            res.send("the item deleted");
        }else{
            res.send("system crashed!@#$%");
        }
    })


});



app.listen(7800,()=>{
    console.log("the serve is runing");
});

