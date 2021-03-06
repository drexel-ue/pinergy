import React from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import "./navbar.css";
import UserSearchResultContainer from "../search/user_search_result_container";
import ScrollToTop from "./scroll_to_top";

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

  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.setState({
        users: [],
        queryString: ""
      });
    }
  }

  toggleDropdown(className) {
    return event => {
      event.preventDefault();
      event.stopPropagation();
      const userTasks = document.getElementsByClassName(className)[0];
      userTasks.classList.remove("hide");
      let timeOut;
      userTasks.addEventListener("mouseleave", () => {
        timeOut = setTimeout(() => {
          userTasks.classList.add("hide");
        }, 500);
      });
      userTasks.addEventListener("mouseenter", () => {
        clearTimeout(timeOut);
      });
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
                value={this.state.queryString}
              />
              <div id="search_bar_results" className={show}>
                <div className="people_label">People</div>
                {this.state.users.map((user, index) => (
                  <div key={index}>
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

          </div>
          <div className="RightIcons">
            <Link
              to={`/profile/${this.props.user ? this.props.user.username : ""}`}
              className="Links1"
            >
              <div className="Profile">
                {this.props.user ? this.props.user.username : ""}
                <img
                  alt=""
                  className="ProfileIcon"
                  src={this.props.user ? this.props.user.profilePhotoUrl : ""}
                />
              </div>
            </Link>
            <div className="Navbar-icon-halo">
              <Link
                to={"/"}
                className="fas fa-ellipsis-h fa-2x Links2"
                onClick={this.toggleDropdown("UserTasks")}
              />
            </div>
            <div className="UserTasks hide">
              {user_tasks.map((task, index) => (
                <div key={index} className="UserTasksItems">
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
          <ScrollToTop/>
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
  <Link to={"/pin-creator"} className="nav-drop-link">
    Create Pin
  </Link>,
  <Link to={"/project-details"} className="nav-drop-link">
    Project Details
  </Link>,
  <a
    rel="noopener noreferrer"
    href="https://github.com/drexel-ue/pinergy"
    className="nav-drop-link"
    target="_blank"
  >
    Github Repo
  </a>,
  <Link to={"/request-feature"} className="nav-drop-link">
    Request a feature
  </Link>
];

export default withRouter(NavBar);
