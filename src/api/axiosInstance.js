import axios from "axios";  //Imports the axios library so you can make HTTP requests (GET, POST, PUT, DELETE) from the browser.

const axiosInstance = axios.create({  // To makes a new Axios instance with default settings.
  baseURL: "http://localhost:5000/api",
});

axiosInstance.interceptors.request.use((config) => {//Adds a request interceptor to the axios instance.An interceptor runs just before every request is sent and lets you modify the request config (headers, URL, body, etc.).
  const token = localStorage.getItem("token"); //Reads the saved token from the browser localStorage under the key "token".

  if (token) { //If a token exists, the code adds an Authorization header to the outgoing request: Authorization: Bearer <token>.By doing this in the interceptor, every request automatically includes the token when available — no need to manually add the header in each request.
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; //Returns the (possibly modified) config object so Axios can continue and actually send the request.
});

export default axiosInstance;
//Exports the configured axios instance so other parts of your React app can import it and use it for API calls (e.g., import axiosInstance from './axiosInstance').