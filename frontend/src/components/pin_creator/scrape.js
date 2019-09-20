import React, { Component } from "react";
import "./pin_creator.css";

export default class Scrape extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      selectedImageUrl: "",
      prevSelectedImageId: ""
    };
    this.cancelScrape = this.cancelScrape.bind(this);
    this.selectImage = this.selectImage.bind(this);
    this.addPin = this.addPin.bind(this)
  }
  addPin(e) {
    e.preventDefault();
    this.props.addpin(this.state.selectedImageUrl)

    this.props.cancel();
  }
  selectImage(e) {
    e.preventDefault();
    // debugger
    if (this.state.prevSelectedImageId.length !== 0) {
      document.getElementById(this.state.prevSelectedImageId);
    }
    this.setState({
      selectedImageUrl: e.target.currentSrc,
      prevSelectedImageId: e.target.id
    });
  }

  cancelScrape(e) {
    e.preventDefault();

    this.props.cancel();
  }

  render() {
    const { selectedImageUrl } = this.state;
    // debugger;
    return (
      <div className="pin-create-container">
        <div>
          <div>
            <div>Upload from the web</div>
          </div>
          <div>
            <button onClick={this.cancelScrape}>Cancel</button>
            {selectedImageUrl.length > 0 ? (
              <button onClick={this.addPin}>Add to pin</button>
            ) : (
              <div>Add to pin</div>
            )}
          </div>
        </div>
        <div>
          {this.props.scrapedUrls.map((url, idx) => (
            <img
              key={idx}
              id={`pic${idx}`}
              src={url}
              onClick={this.selectImage}
            />
          ))}
        </div>
      </div>
    );
  }
}
