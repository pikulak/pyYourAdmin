import React from 'react'
import axios from 'axios'
import cookie from 'react-cookie'

import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import { lightBlue500, Red500 } from 'material-ui/styles/colors'

import Connect from './Connect.jsx'
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
        this.state = {isConnected: cookie.load("isConnected")};
    }
    componentWillMount(){
        axios.get("/api/database/is_connected/")
            .then(response => {
                this.setState({isConnected: response.data.is_connected});
                cookie.save("isConnected", response.data.is_connected, { path: '/'} )
            })
    }
    render(){
        const isConnected = this.state.isConnected
        return (
            <MuiThemeProvider muiTheme={ muiTheme }>
                {isConnected ? (
                    <App />
                ) : (
                    <Connect />
                )}
            </MuiThemeProvider>
        )
    }
}
