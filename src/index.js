import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Store from './store/';

import App from './app';

import { createGlobalStyle } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
const { persistor, store } = Store();

// const GlobalStyle = createGlobalStyle`
//   html {
//     background-color: orange;
//     box-sizing: border-box;
//     transition: all 0.5s ease-in;
//   }
// `;

function Main() {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <GlobalStyle /> */}
          <App />
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}

ReactDOM.render(<Main />, document.getElementById('root'));
