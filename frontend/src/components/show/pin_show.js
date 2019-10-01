import React from "react";
import { Link } from "react-router-dom";
import "./pin_show.css";

export default class PinShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDropDown: false,
      showPinMenu: false
    };

    this.repin = this.repin.bind(this);
    this.handleBoard = this.handleBoard.bind(this);
    this.togglePinMenu = this.togglePinMenu.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleOffPinDrop = this.toggleOffPinDrop.bind(this);
    this.parseDestinationLink = this.parseDestinationLink.bind(this);
  }

  componentDidMount() {
    this.props.fetchCurrentUser(this.props.id);
    this.props.fetchUserBoards(this.props.id);
    this.props.fetchPin(this.props.match.params.id);
    window.addEventListener("click", this.toggleOffPinDrop);
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.toggleOffPinDrop);
  }

  parseDestinationLink() {
    let hostDomain;
    let { destinationLink } = this.props.pin;
    if (destinationLink.indexOf("//") > -1) {
      hostDomain = destinationLink.split("/")[2];
    } else {
      hostDomain = destinationLink.split("/")[0];
    }
    hostDomain = hostDomain.split(":")[0];
    hostDomain = hostDomain.split("?")[0];
    return hostDomain;
  }

  togglePinMenu(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showPinMenu: !this.state.showPinMenu });
  }

  toggleOffPinDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.showDropDown) {
      this.setState({ showDropDown: false });
    }
  }

  repin(event) {
    event.preventDefault();
    if (this.state.boardId) {
      this.props.repin(this.props.pin, this.state.boardId, this.props.id);
      this.setState({ pinned: true });
    }
  }

  renderSaveBtn() {
    return this.state.showDropDown ? (
      <div className="hide-div" />
    ) : (
      <div className="board-save-btn" onClick={this.repin}>
        Save
      </div>
    );
  }

  renderBoardMenu() {
    return this.state.showDropDown ? (
      <div className="board-drop-down">
        {this.props.boards.map((ele, index) => {
          return (
            <div
              key={index}
              className="board-drop-item"
              onClick={this.handleBoard}
              value={ele._id}
              name={ele.title}
            >
              <div>{ele.title}</div>
            </div>
          );
        })}
      </div>
    ) : (
      <div className="hide-div" />
    );
  }

  handleBoard(e) {
    e.preventDefault();
    this.setState({
      boardName: e.currentTarget.textContent,
      boardId: e.currentTarget.attributes.value.value
    });
  }

  toggleDropDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  renderDropdown() {
    const { boardName } = this.state;
    const board = this.props.boards.find(board =>
      board.pins.some(pin => pin.image._id === this.props.pin.image._id)
    );
    if (board || this.state.pinned) {
      return (
        <div>
          <Link to={""} className="already_pinned">
            {`Saved to ${board ? board.title : boardName}`}
          </Link>
        </div>
      );
    } else {
      return (
        <div className="pin-create-board-dropdown">
          <div className="board-select-text" onClick={this.toggleDropDown}>
            {boardName ? boardName : <p>Select</p>}
          </div>
          <div>
            <i className="fas fa-chevron-down board-down" />
          </div>
          {this.renderSaveBtn()}
        </div>
      );
    }
  }

  render() {
    return this.props.pin ? (
      <div className="pin-show-outer">
        <div className="pin_show_image_wrapper">
          <div className="pin_stick_bar">
            <div className="stick-bar-right">
              <div className="pin-show-share">
                <i className="fas fa-share-alt"></i>
                &nbsp;&nbsp;Share
              </div>
              {this.renderDropdown()}
              {this.renderBoardMenu()}
            </div>
          </div>
          <div className="pin-show-bottom">
            <div className="pin-show-left">
              <a href={this.props.pin.url} target="_blank" className="pin-atag">
                <img
                  className="pin-show-image"
                  src={this.props.pin.url}
                  alt={this.props.pin.title}
                />
                <div className="pin-show-link" onClick={this.openLink}>
                  <i className="fas fa-arrow-right"></i>
                  &nbsp;{this.parseDestinationLink()}
                </div>
              </a>
            </div>
            <div className="pin-show-right">
              <div className="pin-show-info">
                <div className="pin-show-title">{this.props.pin.title}</div>
                <div className="pin-show-desc">
                  {this.props.pin.description}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="pin_show_image_wrapper">
        <div>loading...</div>
      </div>
    );
  }
}
