import React from "react";
import { Icon } from "react-icons-kit";
import { remove } from "react-icons-kit/fa/remove";
import "./pin_creator.css";
import Dropzone from "react-dropzone";
import Scrape from "./scrape_container";
import { withRouter } from "react-router-dom";
import Loader from "../loader/loader";
const ImageApi = require("../../util/image_util");
class PinCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      title: "",
      description: "",
      boardName: "",
      boardId: "",
      destinationLink: "",
      scrapeUrl: "",
      scrapedPhotos: [],
      scrapedImage: null,
      image: null,
      showDropDown: false,
      inputUrl: false,
      renderScrape: false
    };
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.removeAllLoadedFile = this.removeAllLoadedFile.bind(this);
    this.toggleInputUrl = this.toggleInputUrl.bind(this);
    this.toggleOffUrlInput = this.toggleOffUrlInput.bind(this);
    this.toggleOffDropDown = this.toggleOffDropDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBoard = this.handleBoard.bind(this);
    this.handleScrape = this.handleScrape.bind(this);
    this.toggleOffScrapedImages = this.toggleOffScrapedImages.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleAddPin = this.handleAddPin.bind(this);
    this.renderPreview = this.renderPreview.bind(this);
  }
  componentDidMount() {
    // this is for toggling off by clicking any where on the windwo
    this.props.fetchCurrentUser(this.props.id);

    this.props.fetchUserBoards(this.props.id);
    //
    window.addEventListener("click", this.toggleOffUrlInput);
    // document.addEventListener("click", this.toggleOffUrlInput)
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
    if (this.state.inputUrl && e.target.className !== "url-selected-input") {
      this.setState({ inputUrl: false });
    }
  }

  toggleOffDropDown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.showDropDown) {
      this.setState({ showDropDown: false });
    }
  }

  toggleDropDown(e) {
    e.preventDefault();
    e.stopPropagation();
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  toggleOffScrapedImages() {
    this.setState({ renderScrape: false, scrapeUrl: "" });
  }

  //// -------------- misc func

  verifyFile(file) {
    //filters file input
    const maxImgSize = 10000000000;
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
    this.setState({ image: null, scrapedImage: null });
  }

  //------------- handle funcs

  handleAddPin(imgUrl) {
    this.setState({ scrapedImage: imgUrl });
  }
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
            image: myFileItemReader.result
          });
        };
        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  async handleSubmit(e) {
    e.preventDefault();
    let reqData = undefined;
    if (this.state.image !== null) {
      this.setState({ loading: true });
      const formData = new FormData();
      const image = this.state.image;
      let typeName = image.slice(5, 15);
      if (typeName.includes("png") || typeName.includes("jpg")) {
        typeName = typeName.slice(0, typeName.length - 1);
      }
      const slicedData =
        typeName.includes("png") || typeName.includes("jpg")
          ? image.slice(22)
          : image.slice(23);
      const byteCharacters = atob(slicedData);
      const byteNumbers = new Array(byteCharacters.length);

      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: `${typeName}` });

      formData.set("image", blob);
      window.formData = formData;
      const res = await ImageApi.getAwsUrl(formData);
      // debugger
      reqData = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        url: res.data.imageUrl,
        boardId: this.state.boardId,
        destinationLink: this.state.destinationLink,
        image: res.data.id
      };
    } else if (this.state.scrapedImage !== null) {
      this.setState({ loading: true });

      reqData = {
        id: this.state.id,
        title: this.state.title,
        description: this.state.description,
        scrapedImageUrl: this.state.scrapedImage,
        boardId: this.state.boardId,
        destinationLink: this.state.destinationLink
      };
    }
    // debugger
    if (reqData)
      this.props.createPins(reqData).then(res => {
        this.props.history.push(`/pins/${res._id}`);
      });
  }

  handleBoard(e) {
    e.preventDefault();
    this.setState({
      boardName: e.currentTarget.textContent,
      boardId: e.currentTarget.attributes.value.value
    });
  }

  handleChange(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  async handleScrape(e) {
    e.preventDefault();
    this.setState({ loading: true });
    const urlList = await ImageApi.scrape(this.state.scrapeUrl);
    this.setState({
      loading: false,
      scrapedPhotos: urlList.data.urls,
      renderScrape: !this.state.renderScrape
    });
  }
  // -------------- ALL RENDERS
  renderRemovebtn() {
    return this.state.image !== null || this.state.scrapedImage !== null ? (
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
          value={this.state.scrapeUrl}
          onChange={this.handleChange("scrapeUrl")}
        />
        <div className="url-selected-btn" onClick={this.handleScrape}>
          <i className="fa fa-angle-right"></i>
        </div>
      </div>
    ) : (
      <div className="url-unselected" onClick={this.toggleInputUrl}>
        Save from site
      </div>
    );
  }
  renderBoardMenu() {
    return this.state.showDropDown ? (
      <div className="board-drop-down">
        {this.props.boards.map(ele => {
          return (
            <div
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

  renderPreview() {
    const { image, scrapedImage } = this.state;
    return image !== null ? (
      <div className="prev-image-cont">
        <div className="remove-btn-cont">{this.renderRemovebtn()}</div>
        <img alt="" src={image} className="imgprvw" />
      </div>
    ) : (
      <div className="prev-image-cont">
        <div className="remove-btn-cont">{this.renderRemovebtn()}</div>
          <img alt="" src={scrapedImage} className="imgprvw" />
      </div>
    );
  }
  render() {
    const maxImgSize = 10000000;
    const { image, boardName, scrapedImage } = this.state;
    const user = this.props.currentUser;

    if (this.state.loading) {
      return <Loader />;
    } else if (this.state.renderScrape === false) {
      return this.props.currentUser ? (
        <div className="pin-create-container">
          <form className="pin-create-inner">
            <div className="pin-create-right">
              {image !== null || scrapedImage !== null ? (
                this.renderPreview()
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
              {/* {this.renderRemovebtn()} */}
              {image === null && scrapedImage === null ? (
                this.renderInput()
              ) : (
                <div />
              )}
            </div>

            <div className="pin-create-left">
              <div className="create-right-top">
                <div className="pin-create-board-dropdown">
                  <div
                    className="board-select-text"
                    onClick={this.toggleDropDown}
                  >
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
                <img alt="" src={user.profilePhotoUrl} className="create-prof-img" />
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
                value={this.state.destinationLink}
                onChange={this.handleChange("destinationLink")}
              />
            </div>
          </form>
        </div>
      ) : (
        <div />
      );
    } else {
      return (
        <div>
          <Scrape
            scrapedUrls={this.state.scrapedPhotos}
            cancel={this.toggleOffScrapedImages}
            addpin={this.handleAddPin}
          />
        </div>
      );
    }
  }
}

export default withRouter(PinCreator);
