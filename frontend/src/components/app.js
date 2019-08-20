import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import ModalContainer from "./modal/modal";
import ProfileHeadContainer from "./profile/profile_head_container";
import HomeContainer from "./home/home_container";
import PinCreatorContainer from "./pin_creator/pin_creator_container";
import PinShowContainer from "./show/pin_show_container";
import ProfileContainer from "./profile/profile_container";

class App extends React.Component {
  render() {
    return (
      <div>
        <ModalContainer />
        <NavBarContainer />
        <Switch>
          <AuthRoute exact path="/" component={MainPage} />
          <ProtectedRoute
            path="/profile/:username"
            component={ProfileContainer}
          />
          <ProtectedRoute
            exact
            path="/pin_creator"
            component={PinCreatorContainer}
          />
        </Switch>
        <Route path="/home" component={HomeContainer} />
        <ProtectedRoute path="/pins/:id" component={PinShowContainer} />
      </div>
    );
  }
}

export default App;
