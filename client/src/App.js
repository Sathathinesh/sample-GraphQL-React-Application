import './App.css';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo'
// components 
import Booklist from './components/Booklist';
import Addbook from './components/Addbook';

// apollo client setup

const client = new ApolloClient({
  uri:'http://localhost:4000/graphql'
})

function App() {
  return (
    <ApolloProvider client={client}>
    <div id="main">
      <h1>Reading LIST Book</h1>
      <Booklist />
      <Addbook />
    </div>
    </ApolloProvider>
  );
}

export default App;
