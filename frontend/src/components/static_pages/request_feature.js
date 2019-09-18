import React from "react";
import "./static_pages.css";

export default class RequestFeature extends React.Component {


    render() {
        return (
            <div className="request-feat">
                <div className="req-title">
                    Request a new Pinergy feature
                </div>
                <div className="req-sub">
                    Have a new idea for us?
                </div>
                <div className="req-input-cont">
                    <textarea className="req-text"></textarea>
                </div>
                <div className="button-cont">
                    <button className="submit-req">
                        Submit
                    </button>
                </div>
            </div>
        )
    }
}