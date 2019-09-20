import React, { Component } from "react";
import Masonry from "react-masonry-component";
import "./pin_creator.css";

const masonryOptions = {
  transitionDuration: 650,
  itemSelector: ".home-pin-wrap",
  columnWidth: 270,
  fitWidth: true
};


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
      <div className="scrape-page">
        <div className="scrape-contatiner">
        <div className="scrape-top">
          <div className="scrape-top-right">
            <div>Upload from the web</div>
          </div>
          <div className="scrape-top-left">
            <button onClick={this.cancelScrape}
            className="scrape-cancel">Cancel</button>
            {selectedImageUrl.length > 0 ? (
              <button 
              className="scrape-add-en"
              onClick={this.addPin}>Add to Pin</button>
            ) : (
              <div
              className="scrape-add-dis">Add to Pin</div>
            )}
          </div>
        </div>
          <Masonry
            className="scrape-masonry"
            elementType="div"
            updateOnEachImageLoad={true}
            options={masonryOptions}
          >
            {this.props.scrapedUrls.map((url, idx) => (
              <img
                key={idx}
                className="scrape-image"
                id={`pic${idx}`}
                src={url}
                onClick={this.selectImage}
              />
            ))}
          </Masonry>
      </div>
      </div>
    );
  }
}
