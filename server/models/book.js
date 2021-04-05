const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// no need to worry about the id 
// becase mongodb automatically create an id 
const bookSchema = new Schema({
    name : String,
    genre : String,
    authorid: String
});

// collection name is Book
// create a collection Book
module.exports = mongoose.model('Book',bookSchema);
