import React from "react";
import "./static_pages.css";

export default class RequestFeature extends React.Component {

    render() {
        return (
            <div className="project-details-page">
                <div className="pd-left">
                    <div>
                        Thank you for using Pingery!
                    </div>
                    <div className="pd-logo">
                        P
                    </div>
                </div>
                <div className="pd-right">
                    <div className="pd-desc">
                        Pinergy is a web-application modeled after the popular social media website, <a rel="noopener noreferrer" className="pin-a-link" target="_blank" href="https://www.pinterest.com/"> Pinterest. </a> Pinergy was built using the MERN stack over the course of 2 weeks. This application utilized web-scraping and AWS S3 to obtain and store links from URLs. Try creating a new Pin with your own image, or enter a URL and selected from a list of images found on that page.
                    </div>
                    <div className="pd-cont">
                        <div className="contributors">
                            Contributors:
                        </div>
                        <div className="team-members">
                            <a 
                                className="team-member"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/Anshuj11">
                                Anshu Jain
                            </a>
                            <a
                                className="team-member"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/ClaytonJones839">
                                Clayton Jones
                            </a>
                            <a
                                className="team-member"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/drexel-ue">
                                IKesh Pack
                            </a>
                            <a
                                className="team-member"
                                target="_blank"
                                rel="noopener noreferrer"
                                href="https://github.com/paulkwchoi92">
                                Paul Kilwoung Choi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}