import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import ModalContainer from "./modal/modal";
import ProfileHeadContainer from "./profile/profile_head_container";

class App extends React.Component {
  render() {
    return (
      <div>
        <ModalContainer />
        <NavBarContainer />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <ProtectedRoute path="/profile" component={ProfileHeadContainer} />
          <ProtectedRoute
            exact
            path="/profile/boards"
            component={ProfileHeadContainer}
          />
          <ProtectedRoute
            exact
            path="/profile/pins"
            component={ProfileHeadContainer}
          />
          <ProtectedRoute
            exact
            path="/profile/tries"
            component={ProfileHeadContainer}
          />
          <ProtectedRoute
            exact
            path="/profile/topics"
            component={ProfileHeadContainer}
          />
          {/* <AuthRoute exact path="/login" component={LoginFormContainer} /> */}
          {/* <AuthRoute exact path="/signup" component={SignupFormContainer} /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
