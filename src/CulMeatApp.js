import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainPage from './components/MainPage'
import {createMuiTheme} from "@material-ui/core/styles";
import {ThemeProvider} from '@material-ui/styles';

class CulMeatApp extends React.Component {
    myTheme = createMuiTheme({
        palette: {
            primary: {main: '#80d06d'}
        },
    });

    render() {
        return (
            <div>
                <ThemeProvider theme={this.myTheme}>
                    <BrowserRouter>
                        <Route path={["/", "/control_panel", "/permissions"]} exact component={MainPage}/>
                        <Route path="/login" exact component={Login}/>
                        <Route path="/signup" exact component={SignUp}/>
                    </BrowserRouter>
                </ThemeProvider>
            </div>
        )
    }
}

export default CulMeatApp;