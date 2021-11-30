import React from 'react';
import ReactDOM from 'react-dom';
import App from './views/App';
import {Provider} from 'react-redux'
import {store} from './store'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
// NOTE: 再レンダーしているとこを教えてくれる
import {whyDidYouUpdate} from 'why-did-you-update'

// NOTE: PWA用
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import reportWebVitals from './reportWebVitals';
import VideoChat from "./views/VideoChat";

// MUI用
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {grey, teal} from "@mui/material/colors";
import Welcome from "./views/Welcome";
import Test from "./views/Test";

whyDidYouUpdate(React)

const theme = createTheme({
    palette: {
        primary: {
            light: grey[200],
            main: grey[500],
            dark: grey[700],
            contrastText: '#fff',
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000',
        },
    },
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Welcome/>}/>
                        <Route path="/app" element={<App/>}/>
                        <Route path="/test" element={<Test/>}/>
                        <Route path="/video" element={<VideoChat/>}/>
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//serviceWorkerRegistration.unregister();
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
