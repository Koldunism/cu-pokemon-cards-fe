import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';
import store from './store';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
