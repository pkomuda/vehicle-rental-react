import React from "react";
import axios from "axios";
import { Button, FormControl } from "react-bootstrap";
import { jwtHeader } from "../../index";
import Table from "../utils/Table"
import CenterButton from "../utils/CenterButton";

class ListUsers extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            columns: [],
            loaded: false
        };
    }

    editButtonFormatter = (cell, row) => {
        const handleEdit = (username) => {
            this.props.history.push("/edituser/" + username);
        };
        return <Button onClick={() => handleEdit(row["username"])}>Edit</Button>;
    };

    deleteButtonFormatter = (cell, row) => {
        const handleDelete = (username) => {
            if (window.confirm("Do you really want to delete user " + username + "?")) {
                axios.delete("/account/" + username, jwtHeader())
                    .then(response => {
                        axios.get("/accounts", jwtHeader())
                            .then(response => {
                                this.setState({users: response.data});
                            });
                    }).catch(error => {
                        alert(error.response.data);
                });
            }
        };
        return <Button onClick={() => handleDelete(row["username"])}>Delete</Button>;
    };

    componentDidMount = () => {
        axios.get("/accounts", jwtHeader())
            .then(response => {
                this.setState({
                    users: response.data,
                    columns: [{
                        dataField: "username",
                        text: 'Username',
                        sort: true
                    }, {
                        dataField: "email",
                        text: "Email address",
                        sort: true
                    }, {
                        dataField: "firstName",
                        text: "First name",
                        sort: true
                    }, {
                        dataField: "lastName",
                        text: "Last name",
                        sort: true
                    }, {
                        dataField: "edit",
                        text: "Edit",
                        isDummyField: true,
                        formatter: this.editButtonFormatter
                    }, {
                        dataField: "delete",
                        text: "Delete",
                        isDummyField: true,
                        formatter: this.deleteButtonFormatter
                    }],
                    loaded: true
                });
            });
    };

    handleSearch = (value) => {
        axios.get("/accounts/" + value, jwtHeader())
            .then(response => {
                this.setState({users: response.data});
            });
    };

    handleAdd = () => {
        this.props.history.push("/adduser");
    };

    renderTable = () => {
        if (this.state.loaded) {
            return (
                <div>
                    <Table keyField="username" data={this.state.users} columns={this.state.columns}/>
                    <hr/>
                    <CenterButton onClick={this.handleAdd} text="Add User"/>
                </div>
            );
        }
    };

    render() {
        return (
            <div>
                <h1>Users</h1>
                <FormControl placeholder="Search" id="searchBar" onChange={() => this.handleSearch(document.getElementById("searchBar").value)}/>
                <hr/>
                {this.renderTable()}
                <CenterButton back onClick={this.props.history.goBack} text="Back"/>
            </div>
        )
    }
}

export default ListUsers;
