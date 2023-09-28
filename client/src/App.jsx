import './App.css';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
