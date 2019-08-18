import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import ModalContainer from "./modal/modal";
import ProfileHeadContainer from "./profile/profile_head_container";
import HomeContainer from "./home/home_container";
import PinShowContainer from "./show/pin_show_container";

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
            exact={true}
            path="/profile/boards"
            component={ProfileHeadContainer}
          />
          <ProtectedRoute
            exact={true}
            path="/profile/pins"
            component={ProfileHeadContainer}
          />
          <ProtectedRoute
            exact={true}
            path="/profile/tries"
            component={ProfileHeadContainer}
          />
          <ProtectedRoute
            exact
            path="/profile/topics"
            component={ProfileHeadContainer}
          />
        </Switch>
        <Route path="/home" component={HomeContainer} />
        <ProtectedRoute path="/pins/:id" component={PinShowContainer} />
      </div>
    );
  }
}

export default App;
