import {Provider} from 'react-redux'
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ApolloProvider } from '@apollo/client';
import client from './apolloClient';
import { store } from './app/store';
import './index.css'



ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
          <App />
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
