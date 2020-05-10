import React from "react";
// import {Container, Row} from 'react-bootstrap'
import Dashboard from "./dashboard/Dashboard";


export default class MainPage extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // let jwtToken = localStorage.getItem('jwtToken');
        // if (jwtToken === null) {
        //     this.props.history.push("/login");
        // }
    }

    render() {
        return(
            <Dashboard/>
        )
    }

}