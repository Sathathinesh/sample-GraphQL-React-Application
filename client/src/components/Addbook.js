import React,{Component} from 'react';
//import {gql} from 'apollo-boost';
import {graphql} from 'react-apollo';
import {getAuthorsQuery,addBookMutation, getBooksQuery} from '../queries/queries'
import {flowRight as compose} from 'lodash';

class Addbook extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            name:'',
            genre:'',
            authorid:''
        };

    }

    displayAuthors(){
        var data =this.props.getAuthorsQuery;
        //console.log(data)

        if(data.loading){
            return (<option disabled> Loading Author</option>);
        }
        else{
            return data.authors.map(author =>{
                return(<option key={author.id} value={author.id}>{author.name}</option>);
            });
        }
    }

    submitForm(e){
        e.preventDefault();
        //console.log(this.state);
        this.props.addBookMutation({
            variables:{
                name:this.state.name,
                genre:this.state.genre,
                authorid:this.state.authorid
            },
            refetchQueries:[{query:getBooksQuery}]
        });
    }

    render(){
       // console.log(this.props);
        return(
         <form id ="add-book" onSubmit={this.submitForm.bind(this)}>
             <div className="field">
                 <label>Book name :</label>
                 <input type="text" onChange={(e)=>this.setState({name:e.target.value})}/>
             </div>
             <div className="field">
                 <label>Genre :</label>
                 <input type="text" onChange={(e)=>this.setState({genre:e.target.value})}/>
             </div>
             <div className="field">
                 <label>Author :</label>
                 <select onChange={(e)=>this.setState({authorid:e.target.value})}>
                     <option>Select getAuthorsQuery</option>
                     {this.displayAuthors()}
                 </select>
             </div>
             <button>+</button>
         </form>
        );
    }
}

export default compose(
    graphql(getAuthorsQuery,{name:"getAuthorsQuery"}),
    graphql(addBookMutation,{name:"addBookMutation"})
)(Addbook);

//export default graphql(addBookMutation)(graphql(getAuthorsQuery)(Addbook))
