import React from 'react';
import { Provider } from "react-redux";
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store'
import 'antd/dist/antd';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
