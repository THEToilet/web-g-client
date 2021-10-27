import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import {Provider} from 'react-redux'
import {store} from './store'
// NOTE: 再レンダーしているとこを教えてくれる
import { whyDidYouUpdate } from 'why-did-you-update'

whyDidYouUpdate(React)

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

