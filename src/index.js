import React from 'react';
import ReactDOM from 'react-dom';
import { configuration } from 'config/_config';
// App Entry
import App from './App';
// Style
import './style/index.css';

/* Redux Store */
import store from "redux/store/store.js";
import { Provider } from "react-redux";

/* Configuration Context */
import { ConfigurationContextProvider } from './context/ConfigurationContext';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigurationContextProvider>
                <App />
            </ConfigurationContextProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);