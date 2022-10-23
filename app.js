require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const router = require("./routes");
const mongoose = require("mongoose")
var flash = require('connect-flash');
const bookModel = require("./models/books.js")
database_url = process.env.DATABASE_URL

mongoose.connect(database_url).then(()=>{
    console.log("Database connected!")
}).catch((error)=>{
    console.log(error)
})

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)
app.use(flash())
app.set("view engine", "ejs")
app.set("views", __dirname+"/views")


app.get('/book-list', (req,res) => {
    bookModel.find({}, function(err, data){
        res.render("bookList.ejs", {books: data})
        console.log(data)
    })
    
})


app.listen(port, ()=>{
    console.log(`App is running at http://localhost:${port}`)
})
