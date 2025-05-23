import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add response interceptor for consistent error handling
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log error for debugging
    console.error("API Error:", error);

    // Return rejected promise with error details
    return Promise.reject(error);
  }
);

export default apiService;
