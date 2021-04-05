const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// no need to worry about the id 
// becase mongodb automatically create an id 
const authorSchema = new Schema({
    name : String,
    age : Number
});

// collection name is Author
// create a collection Author
module.exports = mongoose.model('Author',authorSchema);
