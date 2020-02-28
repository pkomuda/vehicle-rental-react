import React from "react";
import axios from "axios";
import { Form, FormControl, FormGroup, FormLabel } from "react-bootstrap";
import CenterButton from "../utils/CenterButton";

class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {"login": "", "password": "", "email": "", "firstName": "", "lastName": "", "active": true, "permissions": ["CLIENT"]},
            valid: {"login": true, "password": true, "email": true, "firstName": true, "lastName": true}
        };
        this.emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    validateProperty = (property) => {
        let tempValid = {...this.state.valid};
        switch (property) {
            case "login":
                tempValid["login"] = document.getElementById("login").value.length !== 0;
                break;
            case "password":
                tempValid["password"] = document.getElementById("password").value.length >= 8;
                break;
            case "email":
                tempValid["email"] = this.emailRegex.test(document.getElementById("email").value);
                break;
            case "firstName":
                tempValid["firstName"] = document.getElementById("firstName").value.length !== 0;
                break;
            case "lastName":
                tempValid["lastName"] = document.getElementById("lastName").value.length !== 0;
                break;
            default:
                break;
        }
        this.setState({valid: tempValid});
    };

    handleChangeProperty = (event, property) => {
        let tempUser = {...this.state.user};
        tempUser[property] = event.target.value;
        this.setState({user: tempUser});
        this.validateProperty(property);
    };

    checkValidation = () => {
        let validated = true;
        let tempValid = {...this.state.valid};
        tempValid["login"] = document.getElementById("login").value.length !== 0;
        tempValid["password"] = document.getElementById("password").value.length >= 8;
        tempValid["email"] = this.emailRegex.test(document.getElementById("email").value);
        tempValid["firstName"] = document.getElementById("firstName").value.length !== 0;
        tempValid["lastName"] = document.getElementById("lastName").value.length !== 0;
        for (let key in tempValid) {
            if (tempValid.hasOwnProperty(key) && tempValid[key] === false) {
                this.validateProperty(key);
                validated = false;
                break;
            }
        }
        return validated;
    };

    handleSubmit = () => {
        if (this.checkValidation()) {
            axios.post("/register", this.state.user)
                .then(response => {
                    alert(response.data);
                    this.props.history.push("/");
                }).catch(error => {
                    alert(error.response.data);
            });
        } else {
            alert("Please fill out every field in the form.");
        }
    };

    render() {
        return (
            <div>
                <h1>Register</h1>
                <hr/>
                <Form>
                    <FormGroup>
                        <FormLabel>Username</FormLabel>
                        <FormControl id="login" value={this.state.user["login"]} onChange={(event) => this.handleChangeProperty(event, "login")} isInvalid={!this.state.valid["login"]}/>
                        <FormControl.Feedback id="control" type="invalid">Please provide a username.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Password</FormLabel>
                        <FormControl id="password" value={this.state.user["password"]} onChange={(event) => this.handleChangeProperty(event, "password")} isInvalid={!this.state.valid["password"]} type="password"/>
                        <FormControl.Feedback type="invalid">Password must be at least 8 characters long.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Email address</FormLabel>
                        <FormControl id="email" value={this.state.user["email"]} onChange={(event) => this.handleChangeProperty(event, "email")} isInvalid={!this.state.valid["email"]}/>
                        <FormControl.Feedback type="invalid">Please provide a valid email address.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>First name</FormLabel>
                        <FormControl id="firstName" value={this.state.user["firstName"]} onChange={(event) => this.handleChangeProperty(event, "firstName")} isInvalid={!this.state.valid["firstName"]}/>
                        <FormControl.Feedback type="invalid">Please provide a first name.</FormControl.Feedback>
                    </FormGroup>

                    <FormGroup>
                        <FormLabel>Last name</FormLabel>
                        <FormControl id="lastName" value={this.state.user["lastName"]} onChange={(event) => this.handleChangeProperty(event, "lastName")} isInvalid={!this.state.valid["lastName"]}/>
                        <FormControl.Feedback type="invalid">Please provide a last name.</FormControl.Feedback>
                    </FormGroup>
                    <hr/>
                    <CenterButton onClick={this.handleSubmit} text="Submit"/>
                </Form>
                <CenterButton back onClick={this.props.history.goBack} text="Back"/>
            </div>
        );
    }
}

export default Register;
