import React from "react";
import { AnchorButton, Intent} from "@blueprintjs/core"
export default class PinCreator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      board: "",
      destination_link: "",
      showDropDown: false,
      inputUrl: false
    };
    this.fileLoad = this.fileLoad.bind(this)
  }
  componentDidMount() {
    this.props.fetchUser(this.props.id);
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
    
  }


  renderInput() {
    return this.state.inputUrl ? (
      <div>
        <input type="text" className="urlinp" />
      </div>
    ) : (
        <div>
          <div className="subhdr">Drag and image</div>
          <div className="fileuplder">
            <input
              type="file"
              className="filebrserip"
              onDrag={}
              onDrop={}
              onChange={} />
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
    );
  }
  render() {
    const user = this.props.currentUser
    return (
      <div className="">

        <form>
          <input type="text" className="ttlipbx" />
          <div>{user.username}</div>
          <img src={user.profilePhotoUrl} className="prfprfpho" />
          <input type="text" className="dscipbx" />
          <input type="text" className="destlnkbox" />
        </form>
      </div>
    );
  }
}
