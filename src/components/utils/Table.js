import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css";
import "./Table.css";

class Table extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            keyField: this.props.keyField,
            data: this.props.data,
            columns: this.props.columns
        };
    }

    static getDerivedStateFromProps = (props, state) => {
        if (props.data !== state.data) {
            return {data: props.data};
        } else {
            return null;
        }
    };

    render() {
        const sizes = [{
            text: "10", value: 10
        }, {
            text: "25", value: 25
        }, {
            text: "50", value: 50
        }, {
            text: "100", value: 100
        }];
        return <BootstrapTable keyField={this.state.keyField} data={this.state.data} columns={this.state.columns} pagination={paginationFactory({sizePerPageList: sizes})} bootstrap4={true}/>;
    }
}

export default Table;
