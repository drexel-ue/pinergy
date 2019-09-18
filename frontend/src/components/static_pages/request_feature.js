import React from "react";
import "./static_pages.css";

export default class RequestFeature extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            submit: 1
        };

        this.handleSumbit = this.handleSumbit.bind(this)
        this.submitForm = this.submitForm.bind(this)
    }

    handleSumbit(e) {
        e.preventDefault();
        this.setState({submit: 2})
    }

    submitForm() {
        return this.state.submit === 1 ? (
            <div>
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
            <div></div>
        )
    }

    render() {
        return (
            <div className="request-feat">
                <div className="req-title">
                    Request a new Pinergy feature
                </div>
                <div className="req-sub">
                    Have a new idea for us?
                </div>
                {this.submitForm}
            </div>
        )
    }
}