import React from "react";
import ReactDOM from "react-dom";

// We will create this component shortly
import Root from "./components/root";

// Exports functoin to setup the store.
import configureStore from "./store/store";
// We will use this to parse the user's session token.
import jwt_decode from "jwt-decode";
// Exports functions to start, control, and stop, the current session.
import { setAuthToken } from "./util/session_api_util";
// Function to end the current session and scrub the current token.
import { logout } from "./actions/session_actions";

document.addEventListener("DOMContentLoaded", () => {
  let store;
  // If a returning user has a session token stored in localStorage.
  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests.
    setAuthToken(localStorage.jwtToken);
    // Decode the token to obtain the user's information.
    const decodedUser = jwt_decode(localStorage.jwtToken);
    // Create a preconfigured state we can immediately add to our store.
    const preloadedState = {
      entities: {
        users: {},
        boards: {},
        sections: {},
        pins: {}
      },
      session: { isAuthenticated: true, user: decodedUser },
      errors: {}
    };

    store = configureStore(preloadedState);

    const currentTime = Date.now() / 1000;

    // If the user's token has expired.
    if (decodedUser.exp < currentTime) {
      // Logout the user and redirect to the login page.
      store.dispatch(logout());
      window.location.href = "/login";
    }
  } else {
    // If this is a first time user, start with an empty store.
    store = configureStore({});
  }
  // Grab onto root element.
  const root = document.getElementById("root");
  // Render our root component and pass in the store as a prop.
  ReactDOM.render(<Root store={store} />, root);
});
