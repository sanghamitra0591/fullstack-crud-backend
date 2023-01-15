const mongoose= require("mongoose");

const bookSchema= mongoose.Schema({
    title: String,
    author: String,
    category: String,
    year: Number,
    userId: String
})

const BookModel= mongoose.model("book", bookSchema);

module.exports= {
    BookModel
}