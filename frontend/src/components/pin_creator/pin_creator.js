import React from "react";
import { Icon } from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import "./pin_creator.css";
import { getAwsUrl } from "../../util/image_util";
import PinDropzone from "./dropzone";
import Dropzone from "react-dropzone";

export default class PinCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: "",
      description: "",
      board: "",
      destination_link: "",
      showDropDown: false,
      inputUrl: false,
      image: undefined,
      url: "",
      imgSrc: null
    };
    // this.handleOnDrop = this.handleOnDrop.bind(this);
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.removeAllLoadedFile = this.removeAllLoadedFile.bind(this);
    this.toggleInputUrl = this.toggleInputUrl.bind(this);
    this.toggleOffUrlInput = this.toggleOffUrlInput.bind(this);
  }
  componentDidMount() {
    this.props.fetchCurrentUser(this.props.id);
    
      window.addEventListener("click", this.toggleOffUrlInput)
    
  }
  componentWillUnmount() {
    window.removeEventListener("click", this.toggleOffUrlInput)
    // removes eventlistner when mounting different component
  }

  toggleInputUrl(e) {
    
    e.preventDefault();
    e.stopPropagation(); // stops bubbling up, something trigger in the child will bubble up to top which is window in this case
    this.setState({ inputUrl: !this.state.inputUrl });
  }
  verifyFile(file) {
    // debugger
    const maxImgSize = 10000000;
    const acceptedFileTypes =
      "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
    const acceptedFileTypesArr = acceptedFileTypes.split(",").map(item => {
      return item.trim();
    });
    if (file && file.length > 0) {
      const currentFile = file[0];
      // debugger
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
  handleOnDrop = (files, rejectedFiles) => {
    // debugger
    if (rejectedFiles && rejectedFiles.length > 0) {
      this.verifyFile(rejectedFiles);
    }
    if (files && files.length > 0) {
      const isVerified = this.verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];
        const myFileItemReader = new FileReader();
        myFileItemReader.onloadend = () => {
          // debugger
          this.setState({
            imgSrc: myFileItemReader.result
            // url: url
          });
        };

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  removeAllLoadedFile() {
    this.setState({ imgSrc: null });
    //should be calle
  }

  turnOffInputUrl(e) {
    //will be used to toggel off input url
    e.preventDefault();
    this.setState({ inputUrl: false });
  }

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

  renderInput() {
    return this.state.inputUrl ? (
      <div>
        <input type="text" className="urlinp" />
      </div>
    ) : (
      <div className="beforeurlbtn" onClick={this.toggleInputUrl}>
        Save from site
      </div>
    );
  }

  toggleDropDown(e) {
    e.preventDefault();
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  toggleOffUrlInput(e) {
    e.preventDefault();
    if (this.state.inputUrl) {
      // debugger
      this.setState({ inputUrl: false })
    }
  }

  renderSaveBtn() {
    return this.state.showDropDown ? (
      <div className="hide-div" />
    ) : (
      <div className="board-save-btn">Save</div>
    );
  }
  renderBoardMenu() {
    return this.state.showDropDown ? (
      <div className="board-drop-down">
        <div className="board-drop-item">
          <div className="board-item-image" />
          &nbsp;&nbsp;Example User Board1
        </div>
        <div className="board-drop-item">
          <div className="board-item-image" />
          &nbsp;&nbsp;Example User Board2
        </div>
        <div className="board-drop-item">
          <div className="board-item-image" />
          &nbsp;&nbsp;Example User Board3
        </div>
        <div className="board-drop-item">
          <div className="board-item-image" />
          &nbsp;&nbsp;Example User Board4
        </div>
      </div>
    ) : (
      <div className="hide-div" />
    );
  }

  render() {
    const maxImgSize = 10000000;
    const { image } = this.state;
    const user = this.props.currentUser;
    const acceptedFileTypes =
      "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
    const { imgSrc } = this.state;
    return this.props.currentUser ? (
      <div className="pin-create-container"  >
        <form className="pin-create-inner">
          <div className="pin-create-right">
            <div>
              <div>
                {/* <label for="fileUploadId" class="file-label">
            <div>
              <i className="fas fa-arrow-circle-up" />
            </div>
            <br />
          </label> */}
                <div>
                  {imgSrc !== null ? (
                    <img src={imgSrc} className="imgprvw" />
                  ) : (
                    <div>
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
                                <div>
                                  Click Here or Drop Images Here
                                  <i className="fas fa-arrow-circle-up" />
                                </div>
                              </div>
                            </section>
                          )}
                        </Dropzone>
                      </div>
                    </div>
                  )}
                  {this.renderRemovebtn()}
                </div>
              </div>
            </div>
          </div>

          <div className="pin-create-left">
            <div className="create-right-top">
              <div
                className="pin-create-board-dropdown"
                onClick={this.toggleDropDown}
              >
                <div className="board-select-text">Select</div>
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
            />
            <div className="create-pin-user-info">
              <img src={user.profilePhotoUrl} className="create-prof-img" />
              <div className="create-prof-name">{user.username}</div>
            </div>
            <textarea
              type="text"
              className="pin-desc-input"
              placeholder="Tell everyone what your Pin is about"
            />
            <div className="create-right-break" />
            <input
              type="text"
              className="pin-link-input"
              placeholder="Add a destination link"
            />
            {this.renderInput()}
          </div>
        </form>
      </div>
    ) : (
      <div />
    );
  }
}
