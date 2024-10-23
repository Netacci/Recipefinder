// Importing necessary libraries for HTTP requests and error handling.
import axios from 'axios';
import axiosRetry from 'axios-retry';

// Base URL for all HTTP requests, sourced from environment variables for flexibility.
const BASE_URL = import.meta.env.VITE_APP_BASE_URL;


export const publicRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});


/**
 * Applying axios-retry to automatically retry requests on encountering 500 server errors.
 * Separate retry configurations for userRequest, publicRequest, and userFileRequest.
 */
axiosRetry(publicRequest, { retries: 3, retryDelay: () => 3000 });
