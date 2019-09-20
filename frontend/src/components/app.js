import React from "react";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import { Switch, Route } from "react-router-dom";
import NavBarContainer from "./nav/navbar_container";

import MainPage from "./main/main_page";
import ModalContainer from "./modal/modal";
import ProfileHeadContainer from "./profile/profile_head_container";
import HomeContainer from "./home/home_container";
import RequestFeature from "./static_pages/request_feature";
import ProjectDetails from "./static_pages/project_details";
import PinCreatorContainer from "./pin_creator/pin_creator_container";
import PinShowContainer from "./show/pin_show_container";
import ProfileContainer from "./profile/profile_container";
import EditProfile from "./nav/edit_profile";
import Loader from "./loader/loader";

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
        <Route exact path="/request-feature" component={RequestFeature} />
        <Route exact path="/project-details" component={ProjectDetails} />
        <ProtectedRoute path="/pins/:id" component={PinShowContainer} />
        <ProtectedRoute
          exact={false}
          path="/settings/edit-profile"
          component={EditProfile}
        />
      </div>
    );
  }
}

export default App;
