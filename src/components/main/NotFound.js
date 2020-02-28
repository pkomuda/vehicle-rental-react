import React from "react";
import CenterButton from "../utils/CenterButton";

class NotFound extends React.Component {

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Page not found</h1>
                <CenterButton back onClick={this.props.history.goBack} text="Back"/>
            </div>
        )
    }
}

export default NotFound;
