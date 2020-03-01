import React from "react";
import axios from "axios";
import { currentUser, jwtHeader } from "../../index";

class Private extends React.Component {

    constructor(props) {
        super(props);
        this.currentUser = undefined;
        this.permissions = ["GUEST"];
    }

    componentDidMount = () => {
        if (currentUser() !== undefined) {
            axios.get("/account/" + currentUser(), jwtHeader())
                .then(response => {
                    this.currentUser = currentUser();
                    this.permissions = response.data["permissions"];
                });
        }
    };

    componentDidUpdate = () => {
        if (this.currentUser !== currentUser()) {
            if (currentUser() !== undefined) {
                axios.get("/account/" + currentUser(), jwtHeader())
                    .then(response => {
                        this.currentUser = currentUser();
                        this.permissions = response.data["permissions"];
                    });
            } else if (this.permissions !== ["GUEST"]) {
                this.permissions = ["GUEST"];
            }
        }
    };

    render() {
        let hasPermissions = false;
        for (let permission of this.permissions) {
            if (this.props.permissions.includes(permission)) {
                hasPermissions = true;
                break;
            }
        }
        if (hasPermissions) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        } else {
            return <div/>;
        }
    }
}

export default Private;
