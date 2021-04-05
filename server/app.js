const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');

const mongoose = require('mongoose');
const uri = "mongodb+srv://dbUser:dbUsertest@cluster0.mxwxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once('open',()=>{
    console.log('connected the database');
})


/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://dbUser:dbUsertest@cluster0.mxwxj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


mongoose.connection.once('open',()=>{
    console.log('connected the data base');
})
*/
const app = express();

app.use('/graphql',graphqlHTTP({
    schema : schema,
    graphiql:true
}));

app.listen(4000, ()=>{
    console.log('now listening on port 4000');
})
//dbUsertest