import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/';

import App from './app';

import { PersistGate } from "redux-persist/integration/react";
const { persistor, store } = Store();

function Main() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
