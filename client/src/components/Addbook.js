import React,{Component} from 'react';
import {gql} from 'apollo-boost';

import {graphql} from 'react-apollo';

const getAuthorsQuery =gql`
{
    authors{
        name
        id
    }
}
`


class Addbook extends Component{
    

    render(){
       // console.log(this.props);
        return(
         <form id ="add-book">
             <div className="field">
                 <label>Book name :</label>
                 <input type="text" />
             </div>
             <div className="field">
                 <label>Genre :</label>
                 <input type="text" />
             </div>
             <div className="field">
                 <label>Author :</label>
                 <select>
                     <option>Select getAuthorsQuery</option>
                 </select>
             </div>
             <button>+</button>
         </form>
        );
    }
}

export default graphql(getAuthorsQuery)(Addbook);
