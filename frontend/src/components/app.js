import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import ModalContainer from "./modal/modal";
import ProfileHeadContainer from "./profile/profile_head_container";
import HomeContainer from "./home/home_container";
import PinCreatorContainer from "./pin_creator/pin_creator_container"

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
          <ProtectedRoute
            exact
            path="/pin_creator"
            component={PinCreatorContainer}
          />
        </Switch>
        <HomeContainer />
      </div>
    );
  }
}

export default App;
