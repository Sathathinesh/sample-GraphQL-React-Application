const graphql = require('graphql')
const Book = require('../models/book');
const Author = require('../models/author');

const {
    GraphQLObjectType , 
    GraphQLString, 
    GraphQLSchema,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLNonNull
} = graphql ; 
const _ = require('lodash');

/*
//dummy date 
var books =[
    {name : 'Name of the wind',genre:'Fantasy',id:'1',authorid:'1'},
    {name : 'The Final engin',genre :'Fantasy',id:'2',authorid:'2'},
    {name : 'The long Earth',genre:'Sci-fi',id:'3',authorid:'3'}
];

const authors = [
	{ id: '1', name: 'J. K. Rowling',age:28 },
	{ id: '2', name: 'J. R. R. Tolkien',age:30 },
	{ id: '3', name: 'Brent Weeks',age:44}
];
*/

const BookType = new GraphQLObjectType ({
    name: 'Book',
    fields : ()=>({
        id : {type : GraphQLID},
        name :{type : GraphQLString},
        genre  :{type : GraphQLString},
        author : {
            type: AuthorType,
            resolve:(parent,args)=>{
                return Author.findById(parent.authorid);
               // console.log(parent);
               // return  _.find(authors,{id:parent.authorid})
            }
           
            //
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name :'Author',
    description :'this represents author',
    fields:()=>({
        id : {type : GraphQLID},
        name :{type : GraphQLString},
        age : {type : GraphQLInt},
        books:{
            type:new GraphQLList (BookType),
            resolve:(parent,args)=>{
               return Book.find({authorid:parent.id});
               // console.log(parent);
                //return _.filter(books,{authorid:parent.id})
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields : {
        book :{
            type: BookType,
            args : {id :{type:GraphQLID}},
            resolve(parent,args){
                //return _.find(books,{id:args.id});
                return Book.findById(args.id);
            }
        },
        books :{
            type : new GraphQLList (BookType) ,
            description : 'list of books',
            resolve:()=> {
              return Book.find({});
            }
            
        },
        author : {
            type:AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return Author.findById(args.id);
                //return _.find(authors,{id:args.id});
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            description :'list of authors',
            resolve:()=> {
                return Author.find({})
            }
             
        }
    }
});

const RootMutationType = new GraphQLObjectType({
    name :'Mutation',
    description :'Root Mutation',
    fields:()=>({
        addBook : {
        type : BookType,
        description :'Add book',
        args :{
            name :{type : GraphQLNonNull(GraphQLString)},
            genre : {type:GraphQLNonNull(GraphQLString)},
            authorid : {type : GraphQLNonNull(GraphQLID)}
        },
        resolve :(parent,args) =>{
            const book = new Book({
                name: args.name,
                genre:args.genre,
                authorid:args.authorid
            })
            book.save();
            return book
            }
         },
        addAuthor : {
             type : AuthorType,
            description :'Add author',
             args :{
                name :{type : GraphQLNonNull(GraphQLString)},
                age: {type:GraphQLNonNull(GraphQLInt)}
             },
        resolve :(parent,args) =>{
            let author = new Author({
                name : args.name,
                age: args.age
            })
            author.save();
            return author
            /*
            const author = {
                name: args.name,
                genre:args.genre,
                authorid:args.authorid
            }
            books.push(author)
            return author
            */
            }
         },

    })
})


/*
book:(id="2")=>{
  name
  genre
}
*/
module.exports = new GraphQLSchema({
    query : RootQuery,
    mutation: RootMutationType
});