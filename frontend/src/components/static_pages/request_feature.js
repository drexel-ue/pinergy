import React from "react";
import "./static_pages.css";

export default class RequestFeature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submit: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({submit: true})
    }

    submitForm() {
        return this.state.submit === false ? (
            <div>
                <div className="req-sub">
                    Have a new idea for us?
                </div>
                <div className="req-input-cont">
                    <textarea className="req-text"></textarea>
                </div>
                <div className="button-cont">
                    <button
                        onClick={this.handleSubmit}
                        className="submit-req">
                        Submit
                    </button>
                </div>
            </div>
        ) : (
            <div className="req-sub">
                Thank you for your feedback! Your request has been sent.
            </div>
        )
    }

    render() {
        return (
            <div className="request-feat">
                <div className="req-title">
                    Request a new Pinergy feature
                </div>

                {this.submitForm()}
            </div>
        )
    }
}