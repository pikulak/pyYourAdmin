import React from 'react'
import axios from 'axios'
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { lightBlue500 } from 'material-ui/styles/colors'

import ConnectForm from './ConnectForm.jsx'
import App from './App.jsx'

const muiTheme = getMuiTheme({
    palette: {
        primary1Color: lightBlue500,
        primary2Color: lightBlue500
    },
    appBar: {
        height: 50
    }
})

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLoggedIn: false};
    }
    componentWillMount(){
        axios.get("/api/user/is_authenticated/")
            .then(response => {
                this.setState({isLoggedIn: response.data.is_authenticated});
            })
    }
    render(){
        const isLoggedIn = this.state.isLoggedIn
        return (
            <MuiThemeProvider>
                {isLoggedIn ? (
                    <App />
                ) : (
                    <ConnectForm />
                )}
            </MuiThemeProvider>
        )
    }
}
