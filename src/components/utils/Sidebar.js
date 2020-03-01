import React from "react";
import { withRouter } from "react-router-dom";
import Cookies from "universal-cookie";
import { slide as Menu } from "react-burger-menu";
import { currentUser } from "../../index";
import "./Sidebar.css"
import Private from "../main/Private";

class Sidebar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {menuOpen: false};
        this.cookies = new Cookies();
    }

    closeMenu = () => {
        this.setState({menuOpen: false})
    };

    handleStateChange = (state) => {
        this.setState({menuOpen: state.isOpen});
    };

    handleRedirect = (event, page) => {
        event.preventDefault();
        if (this.props.location.pathname !== "/" + page) {
            this.props.history.push("/" + page);
        }
        this.closeMenu();
    };

    handleLogout = (event) => {
        event.preventDefault();
        this.cookies.remove("jwt");
        this.props.history.push("/login");
        this.closeMenu();
    };

    render () {
        return (
            <Menu isOpen={this.state.menuOpen} onStateChange={this.handleStateChange}>
                <Private permissions={["CLIENT", "MANAGER", "ADMIN"]}>
                    <p>{"Logged in as " + currentUser()}</p>
                </Private>

                <Private permissions={["CLIENT", "MANAGER", "ADMIN"]}>
                    <a onClick={(event) => this.handleRedirect(event, "myprofile")} className="menu-item" href="/">My profile</a>
                </Private>

                <a onClick={(event) => this.handleRedirect(event, "")} className="menu-item" href="/">Home</a>

                <Private permissions={["GUEST"]} className="menu-item">
                    <a onClick={(event) => this.handleRedirect(event, "login")} className="menu-item" href="/">Login</a>
                </Private>

                <Private permissions={["GUEST"]} className="menu-item">
                    <a onClick={(event) => this.handleRedirect(event, "register")} className="menu-item" href="/">Register</a>
                </Private>

                <Private permissions={["ADMIN"]}>
                    <a onClick={(event) => this.handleRedirect(event, "listusers")} className="menu-item" href="/">Users</a>
                </Private>

                <Private permissions={["CLIENT", "MANAGER", "ADMIN"]}>
                    <a onClick={this.handleLogout} className="menu-item" href="/">Logout</a>
                </Private>
            </Menu>
        );
    }
}

export default withRouter(Sidebar);
