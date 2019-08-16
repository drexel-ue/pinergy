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
          <Link to={"/"} className="Links1">
            Profile
          </Link>
          <div className="RightIcons">
            <Link to={"/"} className="far fa-comment-dots Links2" />
            <Link to={"/"} className="fas fa-bell Links2" />
            <Link to={"/"} className="Links2 PlusSign">
              +{" "}
            </Link>

            <Link to={"/"} className="fas fa-ellipsis-h Links2" />
            <div className="UserTasks">
              {user_tasks.map(task => (
                <div key={task}>{task}</div>
              ))}
            </div>
            <button onClick={this.logoutUser}>Logout</button>
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
  "Add account",
  "Log out"
];

export default NavBar;
