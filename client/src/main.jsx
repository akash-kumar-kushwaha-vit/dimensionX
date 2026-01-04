import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { API_BASE_URL } from './config';

// Set global base URL for axios
axios.defaults.baseURL = API_BASE_URL;

// REPLACE WITH YOUR ACTUAL GOOGLE CLIENT ID
const clientId = "1052842171524-r3v4f4cc93otaobv3us62n68f37hb1er.apps.googleusercontent.com";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={clientId}>
            <App />
        </GoogleOAuthProvider>
    </React.StrictMode>,
)
