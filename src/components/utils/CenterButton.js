import React from "react";
import { Button } from "react-bootstrap";
import "./CenterButton.css"

class CenterButton extends React.Component {

    isBackButton() {
        let style = {};
        if (this.props.back) {
            style["marginTop"] = "1em";
        }
        return style;
    }

    render() {
        return (
            <div className="btn-wrapper">
                <Button style={this.isBackButton()} onClick={this.props.onClick}>{this.props.text}</Button>
            </div>
        )
    }
}

export default CenterButton;
