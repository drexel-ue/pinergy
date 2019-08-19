import React from "react";
import { AnchorButton, Intent, ProgressBar } from "@blueprintjs/core"
import lodash from 'lodash'
import { Icon } from 'react-icons-kit'
import { remove } from 'react-icons-kit/fa/remove'
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
  }
  componentDidMount() {
    this.props.fetchCurrentUser(this.props.id);
  }
  toggleDropDown(e) {
    e.preventDefault();
    this.setState({ showDropDown: !this.state.showDropDown });
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
    const file = e.currentTarge.files[0]
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
    //should be calle
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

  hanldeUpload() {
    const { loadedFile } = this.state;
    loadedFile.map((file, idx) => {
      
    })
  }
  render() {
    const { loadedFile } = this.state;
    const user = this.props.currentUser
    return this.props.currentUser ? (
      <div className="">
        <form>
          <div className="fileuplder">
            <div className="subhdr">Drag and image</div>
            <div className="fileuplder">
              <input
                type="file"
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
            <div className="hlpertxt">Drag and Drop image here</div>
            <div className="filebrowsbutton">
              <AnchorButton
                text="Browse"
                intent={Intent.PRIMARY}
                minimal={true}
                onClick={() => this.fileInput.click()} />
            </div>
          </div>
          <div className="urlform">

          </div>
          <input type="text" className="ttlipbx" />
          <div>{user.username}</div>
          <img src={user.profilePhotoUrl} className="prfprfpho" />
          <input type="text" className="dscipbx" />
          <input type="text" className="destlnkbox" />
        </form>
      </div>
        ) : (
        <div />
      );
  }
}
