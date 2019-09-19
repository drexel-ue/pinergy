import React, { Component } from 'react'
export default class Scrape extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: "",
      images: []
    }
  }

  componentDidMount() {
    this.props.scrapeUrls(this.props.scrapeUrl)
  }

  render() {
    return (
      <div>
        
      </div>
    )
  }
}
