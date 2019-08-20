import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import UserSearchResultContainer from "../search/user_search_result_container";

class NavBar extends React.Component {
  constructor(props) {
    super(props);
    this.logoutUser = this.logoutUser.bind(this);
    this.getLinks = this.getLinks.bind(this);
    this.handleInput = this.handleInput.bind(this);

    this.state = {
      users: [],
      queryString: ""
    };
  }

  logoutUser(e) {
    e.preventDefault();
    this.props.logout();
  }

  componentDidMount() {
    if (this.props.loggedIn) this.props.fetchCurrentUser(this.props.userId);
  }
  toggleDropdown(className) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      document.getElementsByClassName(className)[0].classList.toggle("hide");
    };
  }

  handleInput(event) {
    event.preventDefault();
    const that = this;
    const string = event.target.value;
    if (string.length > 0) {
      this.props.searchUsers(this.props.users, string).then(res => {
        that.setState({
          users: Object.values(res.users),
          queryString: string
        });
      });
    } else {
      that.setState({ queryString: string });
    }
  }

  // Selectively render links dependent on whether the user is logged in
  getLinks() {
    const show = this.state.queryString.length > 0 ? "" : "hide";

    if (this.props.loggedIn) {
      return (
        <div className="NavBar">
          <div className="LeftLinks">
            <div className="Navbar-icon-halo">
              <Link to={"/home"} className="Navbar-logo">
                P
              </Link>
            </div>
            <div className="SearchGrp">
              <i className="fas fa-search" />
              <input
                onChange={this.handleInput}
                type="text"
                className="Searchbar"
              />
              <div id="search_bar_results" className={show}>
                <div className="people_label">People</div>
                {this.state.users.map(user => (
                  <div key={user._id}>
                    <UserSearchResultContainer
                      user={user}
                      queryString={this.state.queryString}
                    />
                  </div>
                ))}
                <div className="full_user_search_link">
                  Pinners named "{this.state.queryString}"
                </div>
              </div>
            </div>
            <Link to={"/"} className="Links1 Home">
              Home
            </Link>
            <Link to={"/home"} className="Links1">
              Following
            </Link>
            <Link
              to={`/profile/${this.props.user ? this.props.user.username : ""}`}
              className="Links1"
            >
              <div className="Profile">
                <img
                  className="ProfileIcon"
                  src={this.props.user ? this.props.user.profilePhotoUrl : ""}
                />
                {this.props.user ? this.props.user.username : ""}
              </div>
            </Link>
          </div>
          <div className="RightIcons">
            <div className="Navbar-icon-halo">
              <Link to={"/"} className="far fa-comment-dots Links2 fa-2x" />
            </div>
            <div className="Navbar-icon-halo">
              <Link to={"/"} className="fas fa-bell fa-2x Links2" />
            </div>
            <div className="Navbar-icon-halo">
              <Link to={"/pin_creator"} className="Links2 PlusSign">
                +{" "}
              </Link>
            </div>
            <div className="Navbar-icon-halo">
              <Link
                to={"/"}
                className="fas fa-ellipsis-h fa-2x Links2"
                onClick={this.toggleDropdown("UserTasks")}
              />
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
    return <div>{this.getLinks()}</div>;
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
