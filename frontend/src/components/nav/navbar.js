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
          <div className="Navbar-logo-wrapper">
            <Link to={"/home"} className="Navbar-logo">
              P
            </Link>
          </div>
          <input type="text" className="Searchbar" />
          <Link to={"/"} className="Links1">
            Home
          </Link>
          <Link to={"/home"} className="Links1">
            Following
          </Link>
          <Link to={"/profile"} className="Links1">
            <div>
              {this.props.user ? this.props.user.username : ""}
              <img
                className="ProfileIcon"
                src={this.props.user ? this.props.user.profilePhotoUrl : ""}
              />
            </div>
          </Link>

          <div className="RightIcons">
            <Link to={"/"} className="far fa-comment-dots Links2 fa-2x" />
            <Link to={"/"} className="fas fa-bell fa-2x Links2" />
            <Link to={"/"} className="Links2 PlusSign">
              +{" "}
            </Link>
            <Link
              to={"/"}
              className=" Links2 Ellipses"
              onClick={this.toggleDropdown("UserTasks")}
            >
              ...
            </Link>
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
