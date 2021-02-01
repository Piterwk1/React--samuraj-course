import React from 'react';

import Header from './components/Header/Header';
import StoreProvider from './store/StoreProvider';

import './App.scss';

const App = () => (
  <StoreProvider>
    <Header />
  </StoreProvider>

  //   <h1>dupa dupa</h1>
);

export default App;
