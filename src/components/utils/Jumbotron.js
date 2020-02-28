import React from "react";
import { Jumbotron as Jumbo } from "react-bootstrap";
import "./Jumbotron.css"

class Jumbotron extends React.Component {

    render() {
        return (
            <Jumbo fluid className="jumbo">
                <div className="overlay"/>
            </Jumbo>
        )
    }
}

export default Jumbotron;
