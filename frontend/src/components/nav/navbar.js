import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount() {
    //debugger;
    if (this.props.loggedIn) this.props.fetchCurrentUser(this.props.userId);
  }
  toggleDropdown(className) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      document.getElementsByClassName(className)[0].classList.toggle("hide");
    };
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    if (this.props.loggedIn) {
      return (
        <div className="NavBar">
          <div className="Navbar-icon-halo">
            <Link to={"/home"} className="Navbar-logo">
              P
            </Link>
          </div>
          <div className="SearchGrp">
          <i class="fas fa-search" />
            <input type="text" className="Searchbar" />
          </div>
          <Link to={"/"} className="Links1 Home">
            Home
          </Link>
          <Link to={"/home"} className="Links1">
            Following
          </Link>
          <Link to={"/profile"} className="Links1">
            <div className="Profile">
              <img
                className="ProfileIcon"
                src={this.props.user ? this.props.user.profilePhotoUrl : ""}
              />
              {this.props.user ? this.props.user.username : ""}
            </div>
          </Link>

          <div className="RightIcons">
            <div className="Navbar-icon-halo">
              <Link to={"/"} className="far fa-comment-dots Links2 fa-2x" />
            </div>
            <div className="Navbar-icon-halo">
              <Link to={"/"} className="fas fa-bell fa-2x Links2" />
            </div>
            <div className="Navbar-icon-halo">
              <Link to={"/"} className="Links2 PlusSign">
                +{" "}
              </Link>
            </div>
            <div className="Navbar-icon-halo">
              <Link
                to={"/"}
                className=" Links2 Ellipses"
                onClick={this.toggleDropdown("UserTasks")}
              >
                ...
              </Link>
            </div>
            <div className="UserTasks hide">
              {user_tasks.map(task => (
                <div key={task} className="UserTasksItems">
                  {task}{" "}
                </div>
              ))}
              <div
                key="logout"
                className="UserTasksItems"
                onClick={this.logoutUser}
              >
                Logout{" "}
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }

  render() {
    return (
      <div>
        {this.getLinks()}
        <h1>Pinergy</h1>
      </div>
    );
  }
}

const user_tasks = [
  "Tune your home feed",
  "Edit settings",
  "Ads support",
  "Request a feature",
  "Get help",
  "See terms and privacy",
  "Add account"
];

export default NavBar;
