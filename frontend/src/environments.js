let BACKEND_URL;
if (process.env.NODE_ENV === 'production') {
    BACKEND_URL = './backend';
} else {
    BACKEND_URL = 'http://localhost:8000';
}

export default BACKEND_URL;