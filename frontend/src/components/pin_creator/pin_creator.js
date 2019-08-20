import React from "react";
import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core"
import lodash from 'lodash'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
import "./pin_creator.css";
export default class PinCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      board: "",
      destination_link: "",
      showDropDown: false,
      inputUrl: false,
      loadedFile: []
    };
    this.onFileLoad = this.onFileLoad.bind(this)
    this.toggleDropDown = this.toggleDropDown.bind(this);
  }
  componentDidMount() {
    this.props.fetchCurrentUser(this.props.id);
  }


  toggleInputUrl(e) {
    e.preventDefault();
    this.setState({ inputUrl: !this.state.inputUrl });
  }
  onDragHandler(e) {
    e.preventDefault();
    e.stopPropagation();

  }
  onFileLoad(e) {
    const file = e.currentTarget.files[0]
    let fileReader = new FileReader();
    fileReader.onload = () => {
      console.log("IMAGE LOADED: ", fileReader.Result)
      const file = {
        // name: file.name,
        // size: file.size,
        // type: file.type,
        data: fileReader.result,
        isUploading: false
      }
      this.addLoadedFile(file)
    }

    fileReader.onabort = () => {
      alert("Reading Aborted!");
    }

    fileReader.onerror = () => {
      alert("Reading Error!")
    }
    
    fileReader.readAsDataURL(file)
  }
  addLoadedFile(file) {
    // this.setState((prevState) => ({ loadedFiles: [...prevState.loadedFiles, file]}))
    // above code will be used to add multiple files to the loading dock
    this.setState((prevState) => ({ loadedFiles: [...prevState.loadedFiles, file] }))
    
  } // splat operator is used to concat new file and old file togeter

  removeLoadedFile(file) { //onlyneeded if we're uploading images, left infor educational purpose
    //remove file from the state
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = lodash.filert(loadedFiles, (ldFiles) => {
        return ldFiles != file; //takes preloaded state and only returns ldFile that equals to file passedin
      })
      return { loadedFiles: newLoadedFiles }
    })
  }

  removeAllLoadedFile() {
    this.setState({ loadedFiles: [] })
  }

  turnOffInputUrl(e) { //will be used to toggel off input url
    e.preventDefault();
    this.setState({ inputUrl: false});
  }

  renderRemovebtn() {
    if (this.state.loadedFile.length === 1)
      return (<Icon
        icon={remove}
        className='rmvicon'
        onClick={this.removeAllLoadedFile}
      />)
  }

  renderInput() {
    return this.state.inputUrl ? (
      <div>
        <input type="text" className="urlinp" />
      </div>
    ) : (
        <div className="beforeurlbtn" onClick={this.toggleInputUrl}>Save from site</div>
    );
  }

  toggleDropDown(e) {
    e.preventDefault();
    this.setState({ showDropDown: !this.state.showDropDown });
  }

  renderSaveBtn() {
    return this.state.showDropDown ? (
        <div className="hide-div"></div>
      ) : ( 
        <div className="board-save-btn">
          Save
        </div>
      );
  }
  renderBoardMenu() {
    return this.state.showDropDown ? (
      <div className="board-drop-down">
        <div className="board-drop-item">
          <div className="board-item-image"></div> 
          &nbsp;&nbsp;Example User Board1
        </div>
        <div className="board-drop-item">
          <div className="board-item-image"></div>
          &nbsp;&nbsp;Example User Board2
        </div>
        <div className="board-drop-item">
          <div className="board-item-image"></div>
          &nbsp;&nbsp;Example User Board3
        </div>
                <div className="board-drop-item">
          <div className="board-item-image"></div> 
          &nbsp;&nbsp;Example User Board4
        </div>
      </div>
    ) : (
        <div className="hide-div"></div>
      );
  }

  render() {
    const { loadedFile } = this.state;
    const user = this.props.currentUser
    return this.props.currentUser ? (
      <div className="pin-create-container">
          <form className="pin-create-inner">
            <div className="pin-create-right">
          <div className="fileuplder">
            <div className="upload-border">
              <label for="fileUploadId" class="file-label"> 
                <div> 
                <i className='fas fa-arrow-circle-up'></i>
                </div>      
                <br />                     
                <div> 
                Drag and drop or click to upload
                </div>
              </label>
              <input
                type="file"
                id="fileUploadId"
                className="filebrserip"
                onDrag={this.onDragHandler}
                onDrop={this.onFileLoad}
                onChange={this.onFileLoad} />
            </div>
            <div className="filepreview">
              {loadedFile.map((file, idx) => {
                return <div clasName='ldedimg' key={idx}>
                  <img src={file.data} />
                    <div className="ldingcontainer">
                      <span className="prgrssbar">
                        {file.isUploading && <ProgressBar />}
                      </span>
                    <span className="rmvbtn">
                      {this.renderRemovebtn}
                    </span>
                    </div>
                  </div>
              })}
            </div>
            </div>
            </div>
              <div className="pin-create-left">
            <div className="create-right-top"> 
              <div className="pin-create-board-dropdown"
                  onClick={this.toggleDropDown}>
                <div className="board-select-text">Select</div>
                <div><i className='fas fa-chevron-down board-down'></i></div>
                {this.renderSaveBtn()}
              </div>
                {this.renderBoardMenu()}
            </div>
              <input 
                type="text" 
                className="pin-title-input" 
                placeholder="Add your title" />
            <div className="create-pin-user-info">
              <img src={user.profilePhotoUrl} className="create-prof-img" />
              <div className="create-prof-name">{user.username}</div>
            </div>
            <textarea 
              type="text" 
              className="pin-desc-input" 
              placeholder="Tell everyone what your Pin is about">
            </textarea>
            <div className="create-right-break"></div> 
          <input 
            type="text" 
            className="pin-link-input"
            placeholder="Add a destination link" />
          </div>
        </form>
      </div>
        ) : (
        <div />
      );
  }
}