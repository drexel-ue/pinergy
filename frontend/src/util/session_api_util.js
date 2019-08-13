import axios from "axios";

export const setAuthToken = token => {
  if (token) {
    // Sets default Authorization header if user has a token.
    axios.defaults.headers.common["Authorization"] = token;
  } else {
    // Deletes the old token for security.
    delete axios.defaults.headers.common["Authorization"];
  }
};

// Initiates backend register handler.
export const signup = userData => {
  return axios.post("/api/users/register", userData);
};

// Initiates backend login handler.
export const login = userData => {
  return axios.post("/api/users/login", userData);
};
