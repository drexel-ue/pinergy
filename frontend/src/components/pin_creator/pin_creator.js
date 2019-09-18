import React from "react";
import { Icon } from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import "./pin_creator.css";
import Dropzone from "react-dropzone";

export default class PinCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: "",
      description: "",
      boardName: "",
      boardId: "",
      destination_link: "",
      imgSrc: null,
      showDropDown: false,
      inputUrl: false,
      image: undefined,
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.removeAllLoadedFile = this.removeAllLoadedFile.bind(this);
    this.toggleInputUrl = this.toggleInputUrl.bind(this);
    this.toggleOffUrlInput = this.toggleOffUrlInput.bind(this);
    this.toggleOffDropDown = this.toggleOffDropDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoard = this.handleBoard.bind(this);
    // this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    // this is for toggling off by clicking any where on the windwo
    this.props.fetchCurrentUser(this.props.id);

    this.props.fetchUserBoards(this.props.id);
    // debugger
    window.addEventListener("click", this.toggleOffUrlInput);
    window.addEventListener("click", this.toggleOffDropDown);
  }

  componentWillUnmount() {
    // for not carrying over the window click function
    window.removeEventListener("click", this.toggleOffUrlInput);
    window.removeEventListener("click", this.toggleOffDropDown);
  }
  ///// ------- toggles
  toggleInputUrl(e) {
    e.preventDefault();
    e.stopPropagation(); // stops bubbling up, something trigger in the child will bubble up to top which is window in this case
    this.setState({ inputUrl: !this.state.inputUrl });
  }
  toggleOffUrlInput(e) {
    e.preventDefault();
    if (this.state.inputUrl) {
      this.setState({ inputUrl: false });
    }
  }

  toggleOffDropDown(e) {
    e.preventDefault();
    if (this.state.showDropDown) {
      this.setState({ showDropDown: false });
    }
  }

  toggleDropDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  //// -------------- misc func

  verifyFile(file) {
    //filters file input
    const maxImgSize = 10000000;
    const acceptedFileTypes =
      "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
    const acceptedFileTypesArr = acceptedFileTypes.split(",").map(item => {
      return item.trim();
    });
    if (file && file.length > 0) {
      const currentFile = file[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > maxImgSize) {
        alert("File too big");
        return false;
      }
      if (!acceptedFileTypesArr.includes(currentFileType)) {
        alert("File type not allowed");
        return false;
      }
    }
    return true;
  }
  removeAllLoadedFile() {
    //logic for remove button
    this.setState({ imgSrc: null });
  }

  //------------- handle funcs
  handleOnDrop = (files, rejectedFiles) => {
    //handles image drop
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.onloadend = () => {
          this.setState({
            imgSrc: myFileItemReader.result
          });
        };

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  handleSubmit(e) {
    e.preventDefault();
    let reqData = {
      id: this.state.id,
      title: this.state.title,
      description: this.state.description,
      boardId: this.state.boardId,
      destination_link: this.state.destination_link,
      imgSrc: this.state.imgSrc
    };
    this.props.createPins(reqData);
  }

  handleBoard(e) {
    e.preventDefault();
    this.setState({
      boardName: e.target.textContent,
      boardId: e.target.attributes.value.value
    });
  }

  handleChange(field) {
    return e => 
      this.setState({
        [field]: e.currentTarget.value
      })
  }

  // -------------- ALL RENDERS
  renderRemovebtn() {
    return this.state.imgSrc !== null ? (
      <Icon
        icon={remove}
        className="rmvicon"
        onClick={this.removeAllLoadedFile}
      />
    ) : (
      <div />
    );
  }

  renderSaveBtn() {
    return this.state.showDropDown ? (
      <div className="hide-div" />
    ) : (
      <div className="board-save-btn" onClick={this.handleSubmit}>
        Save
      </div>
    );
  }

  renderInput() {
    return this.state.inputUrl ? (
      <div className="url-selected">
        <input
          type="text"
          className="url-selected-input"
          placeholder="Enter website"
        />
        <div className="url-selected-btn">
          <i class="fa fa-angle-right"></i>
        </div>
      </div>
    ) : (
      <div className="url-unselected" onClick={this.toggleInputUrl}>
        Save from site
      </div>
    );
  }
  renderBoardMenu() {
    // debugger
    return this.state.showDropDown ? (
      <div className="board-drop-down">
        {this.props.boards.map(ele => {
          // debugger
          return (
            <div
              className="board-drop-item"
              onClick={this.handleBoard}
              value={ele._id}
              name={ele.title}
            >
              <div className="board-item-image">{ele.title}</div>
            </div>
          );
        })}
      </div>
    ) : (
      //
      <div className="hide-div" />
    );
  }
  render() {
    const maxImgSize = 10000000;
    const { image, boardName } = this.state;
    const user = this.props.currentUser;
    const acceptedFileTypes =
      "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
    const { imgSrc } = this.state;
    return this.props.currentUser ? (
      <div className="pin-create-container">
        <form className="pin-create-inner">
          <div className="pin-create-right">
            {imgSrc !== null ? (
              <img src={imgSrc} className="imgprvw" />
            ) : (
              <div className="file-border-wrap">
                <div className="file-border">
                  <div className="file-label">
                    <Dropzone
                      onDrop={this.handleOnDrop}
                      maxSize={maxImgSize}
                      multiple={false}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <section>
                          <div {...getRootProps()}>
                            <input {...getInputProps()} />
                            <div className="dropzone">
                              <i className="fas fa-arrow-circle-up" />
                              <br />
                              Click Here or Drop Images Here
                            </div>
                          </div>
                        </section>
                      )}
                    </Dropzone>
                  </div>
                </div>
              </div>
            )}
            {this.renderRemovebtn()}
            {this.renderInput()}
          </div>

          <div className="pin-create-left">
            <div className="create-right-top">
              <div
                className="pin-create-board-dropdown"
                onClick={this.toggleDropDown}
              >
                <div className="board-select-text">
                  {boardName ? boardName : <p>Select</p>}
                </div>
                <div>
                  <i className="fas fa-chevron-down board-down" />
                </div>
                {this.renderSaveBtn()}
              </div>
              {this.renderBoardMenu()}
            </div>
            <input
              type="text"
              className="pin-title-input"
              placeholder="Add your title"
              value={this.state.title}
              onChange={this.handleChange("title")}
            />
            <div className="create-pin-user-info">
              <img src={user.profilePhotoUrl} className="create-prof-img" />
              <div className="create-prof-name">{user.username}</div>
            </div>
            <textarea
              type="text"
              className="pin-desc-input"
              placeholder="Tell everyone what your Pin is about"
              value={this.state.description}
              onChange={this.handleChange("description")}
            />
            <div className="create-right-break" />
            <input
              type="text"
              className="pin-link-input"
              placeholder="Add a destination link"
              value={this.state.destination_link}
              onChange={this.handleChange("destination_link")}
            />
          </div>
        </form>
      </div>
    ) : (
      <div />
    );
  }
}
